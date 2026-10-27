'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import usePageScript, { onLoad } from '@/lib/usePageScript';
import { FEATURED_PROJECTS, SECTORS, SERVICE_CARDS } from '@/lib/home-data';

// Ported from the original static page: loader, scroll hero, sliders, search, cursor and GSAP animations.
// The cards and enquiry form are rendered by React (app/page.jsx, components/EnquiryForm.jsx).
function init() {
  const $ = (s, c = document) => c.querySelector(s),
    $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches,
    G = typeof gsap !== 'undefined',
    fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  $('#yr').textContent = new Date().getFullYear();
  const pad = (n) => String(n).padStart(2, '0');

  /* ---------- helpers ---------- */
  function split(el) {
    const walk = (n) => {
      [...n.childNodes].forEach((c) => {
        if (c.nodeType === 3) {
          const f = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((p) => {
            if (!p) return;
            if (/^\s+$/.test(p)) {
              f.appendChild(document.createTextNode(' '));
              return;
            }
            const w = document.createElement('span');
            w.className = 'w';
            const i = document.createElement('span');
            i.className = 'wi';
            i.textContent = p;
            w.appendChild(i);
            f.appendChild(w);
          });
          c.replaceWith(f);
        } else if (c.nodeType === 1) walk(c);
      });
    };
    walk(el);
    return $$('.wi', el);
  }
  const splits = $$('.split').map((el) => ({ el, words: split(el) }));
  $$('.pill,.clink').forEach((b) => {
    const tn = [...b.childNodes].find((n) => n.nodeType === 3 && n.textContent.trim()) || b.querySelector('.t');
    if (!tn) return;
    const t = tn.textContent.trim();
    const r = document.createElement('span');
    r.className = 'roll';
    const i = document.createElement('span');
    i.textContent = t;
    i.dataset.t = t;
    r.appendChild(i);
    tn.replaceWith(r);
    if (tn.nodeType === 3) r.after(document.createTextNode(' '));
  });
  $$('.pill').forEach((p) =>
    p.addEventListener('mousemove', (e) => {
      const r = p.getBoundingClientRect();
      p.style.setProperty('--px', e.clientX - r.left + 'px');
      p.style.setProperty('--py', e.clientY - r.top + 'px');
    }),
  );

  /* ---------- lenis ---------- */
  let lenis = null;
  if (!reduce && typeof Lenis !== 'undefined') {
    try {
      lenis = new Lenis({ duration: 1.2 });
      if (G) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      } else {
        const r = (t) => {
          lenis.raf(t);
          requestAnimationFrame(r);
        };
        requestAnimationFrame(r);
      }
    } catch (e) {
      lenis = null;
    }
  }
  const go = (id) => {
    const t = id === '#home' ? document.body : $(id);
    if (!t) return;
    lenis ? lenis.scrollTo(t, { offset: -60 }) : t.scrollIntoView({ behavior: 'smooth' });
  };
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2 || !$(id)) return;
    e.preventDefault();
    document.body.classList.remove('menu-open');
    closeSearch();
    go(id);
  });

  /* ---------- loader ---------- */
  const imgs = $$('img').filter((i) => i.loading !== 'lazy');
  let loaded = 0,
    shown = 0,
    done = false;
  imgs.forEach((im) => {
    if (im.complete) loaded++;
    else {
      im.addEventListener('load', () => loaded++, { once: true });
      im.addEventListener('error', () => loaded++, { once: true });
    }
  });
  setTimeout(() => (loaded = imgs.length), 3500);
  if (G && !reduce)
    gsap.from('#loaderWord span', { yPercent: 110, opacity: 0, rotateX: -90, duration: 0.9, stagger: 0.06, ease: 'power4.out' });
  (function tk() {
    const tg = Math.round((loaded / imgs.length) * 100);
    shown = Math.min(tg, shown + 1.4);
    $('#loaderPct').textContent = String(Math.round(shown)).padStart(3, '0');
    $('#loaderBar').style.transform = `scaleX(${shown / 100})`;
    if (shown >= 100 && !done) {
      done = true;
      finish();
    } else if (!done) requestAnimationFrame(tk);
  })();
  function finish() {
    const L = $('#loader'),
      P = $('#panels');
    if (!G || reduce) {
      L.remove();
      P.remove();
      intro();
      return;
    }
    gsap
      .timeline()
      .to('#loaderWord span', { yPercent: -110, opacity: 0, duration: 0.45, stagger: 0.03, ease: 'power3.in' })
      .to('.loader-bar,.loader-pct', { opacity: 0, duration: 0.3 }, '<')
      .to('#panels i', { scaleY: 1, duration: 0.55, stagger: 0.06, ease: 'power3.inOut' })
      .add(() => L.remove())
      .set('#panels i', { transformOrigin: 'top' })
      .to('#panels i', { scaleY: 0, duration: 0.6, stagger: 0.06, ease: 'power3.inOut' })
      .add(intro, '-=.5')
      .add(() => P.remove());
  }

  /* ---------- intro ---------- */
  // Arriving from another page with a hash (e.g. /#services): the pinned hero adds scroll length after the
  // browser's own jump, so scroll to the section once the loader has finished.
  const toHash = () => {
    let t = null;
    try {
      t = location.hash.length > 1 && $(location.hash);
    } catch {}
    if (!t) return;
    if (G) ScrollTrigger.refresh();
    lenis ? lenis.scrollTo(t, { offset: -60, immediate: true }) : scrollTo(0, t.getBoundingClientRect().top + scrollY - 60);
  };

  function intro() {
    startHero();
    setTimeout(toHash, 50);
    if (!G || reduce) return;
    gsap
      .timeline({ defaults: { ease: 'power4.out' } })
      .from('.nav-in > *', { y: -26, opacity: 0, duration: 0.8, stagger: 0.08, clearProps: 'transform,opacity' })
      .from('#zword span', { yPercent: 60, opacity: 0, duration: 1.2, stagger: 0.03, ease: 'power4.out' }, 0.15)
      .from('#zvid', { scale: 1.25, duration: 2.4, ease: 'power3.out' }, 0)
      .from('#zintro .hero-eyebrow,#zintro p,#zacts', { y: 16, opacity: 0, duration: 0.8, stagger: 0.15 }, 0.7)
      .from('#zcue', { y: 16, opacity: 0, duration: 0.8 }, 1.1);
  }

  /* ---------- hero: video inside the word, scroll zooms through the O ---------- */
  const hero = $('.hero'),
    zv = $('#zVid');
  const startHero = () => {
    zv.play().catch(() => {});
  };
  if (!G || reduce) hero.classList.add('flat');
  if (fine && !reduce)
    hero.addEventListener('mousemove', (e) => {
      const x = e.clientX / innerWidth - 0.5,
        y = e.clientY / innerHeight - 0.5;
      $('#zword').style.translate = `${x * -18}px ${y * -12}px`;
      $('#zvid').style.translate = `${x * 22}px ${y * 14}px`;
    });

  /* ---------- nav ---------- */
  const nav = $('#nav'),
    prog = $('#progress'),
    tt = $('#totop'),
    ring = $('#topRing');
  let lastY = 0;
  function onS() {
    const y = scrollY,
      m = document.documentElement.scrollHeight - innerHeight,
      p = m > 0 ? y / m : 0;
    nav.classList.toggle('scrolled', y > 30);
    lastY = y;
    prog.style.transform = `scaleX(${p})`;
    tt.classList.toggle('show', y > 700);
    ring.style.strokeDashoffset = 144.5 * (1 - p);
  }
  addEventListener('scroll', onS, { passive: true });
  onS();
  const links = $$('#menu > li > a'),
    ink = $('#ink');
  const mv = (a) => {
    if (!a) return;
    ink.style.left = a.parentElement.offsetLeft + 13 + 'px';
    ink.style.width = a.offsetWidth - 26 + 'px';
  };
  links.forEach((a) => a.addEventListener('mouseenter', () => mv(a)));
  $('#menu').addEventListener('mouseleave', () => mv($('#menu > li > a.active')));
  setTimeout(() => mv($('#menu > li > a.active')), 400);
  document.fonts.ready.then(() => mv($('#menu > li > a.active'))); // re-measure once the web font has replaced the fallback
  addEventListener('resize', () => mv($('#menu > li > a.active')));
  const sio = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
          mv($('#menu > li > a.active'));
        }
      }),
    { rootMargin: '-45% 0px -50% 0px' },
  );
  ['home', 'services', 'projects', 'sectors', 'band', 'contact'].forEach((id) => sio.observe(document.getElementById(id)));
  $('#burger').addEventListener('click', () => document.body.classList.toggle('menu-open'));

  /* ---------- search ---------- */
  const S = $('#search'),
    SI = $('#sIn'),
    SR = $('#sRes');
  const idx = [
    ...SERVICE_CARDS.map((s) => [s.title, 'Service', s.href || '#services']),
    ...SECTORS.map((s) => [s.title, 'Sector', '#sectors']),
    ...FEATURED_PROJECTS.map((p) => [p.title, 'Project', '#projects']),
    ['Contact & offices', 'Page', '#contact'],
  ];
  const render = (q) => {
    const r = idx.filter((i) => i[0].toLowerCase().includes(q.toLowerCase()));
    SR.innerHTML = r.length
      ? r.map((i) => `<li><a href="${i[2]}">${i[0].replace('&', '&amp;')}<small>${i[1]}</small></a></li>`).join('')
      : '<li class="sempty">No matches. Try “rail”, “water” or “energy”.</li>';
    if (G && !reduce) gsap.from('#sRes li', { y: 10, opacity: 0, duration: 0.35, stagger: 0.025 });
  };
  function openSearch() {
    S.classList.add('open');
    render('');
    setTimeout(() => SI.focus(), 200);
    lenis && lenis.stop();
  }
  function closeSearch() {
    if (!S.classList.contains('open')) return;
    S.classList.remove('open');
    SI.value = '';
    lenis && lenis.start();
  }
  $('#openSearch').addEventListener('click', openSearch);
  SI.addEventListener('input', () => render(SI.value));
  S.addEventListener('click', (e) => {
    if (e.target === S) closeSearch();
  });

  /* ---------- cursor + magnetic + spotlight ---------- */
  const cur = $('#cursor'),
    dot = $('#cursorDot'),
    fl = $('#floatImg');
  let mx = -200,
    my = -200;
  if (fine && !reduce) {
    let cx = mx,
      cy = my,
      fx = mx,
      fy = my;
    addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px)`;
    });
    (function l() {
      cx += (mx - cx) * 0.16;
      cy += (my - cy) * 0.16;
      cur.style.transform = `translate(${cx}px,${cy}px)`;
      fx += (mx - fx) * 0.1;
      fy += (my - fy) * 0.1;
      fl.style.transform = `translate(${fx + 30}px,${fy - 105}px) rotate(${(mx - fx) * 0.04}deg)`;
      requestAnimationFrame(l);
    })();
    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest('a,button,[data-cursor],input,textarea');
      cur.classList.toggle('hov', !!el);
      const l = e.target.closest('[data-cursor]');
      if (l && !e.target.closest('.carr')) {
        cur.dataset.label = l.dataset.cursor;
        cur.classList.add('lab');
      } else cur.classList.remove('lab');
    });
    $$('.magnetic').forEach((el) => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        el.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.22}px ${(e.clientY - r.top - r.height / 2) * 0.32}px`;
      });
      el.addEventListener('mouseleave', () => (el.style.translate = ''));
    });
    $$('.scard').forEach((c) =>
      c.addEventListener('mousemove', (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', e.clientX - r.left + 'px');
        c.style.setProperty('--my', e.clientY - r.top + 'px');
      }),
    );
  }

  /* ---------- sliders ---------- */
  function slider(view, trackEl, prev, next, bar, curEl) {
    const items = [...trackEl.children];
    let i = 0,
      sx = 0,
      dx = 0,
      down = false,
      moved = false;
    const gap = () => parseFloat(getComputedStyle(trackEl).columnGap) || 2;
    const step = () => items[0].getBoundingClientRect().width + gap();
    const per = () => Math.max(1, Math.round(view.clientWidth / step()));
    const max = () => Math.max(0, items.length - per());
    const set = (k) => {
      i = Math.max(0, Math.min(max(), k));
      trackEl.style.transform = `translateX(${-i * step()}px)`;
      prev.disabled = i === 0;
      next.disabled = i === max();
      const p = per();
      bar.style.width = (p / items.length) * 100 + '%';
      bar.style.left = (i / items.length) * 100 + '%';
      if (curEl) curEl.textContent = pad(i + 1);
    };
    prev.addEventListener('click', () => set(i - 1));
    next.addEventListener('click', () => set(i + 1));
    view.addEventListener('pointerdown', (e) => {
      down = true;
      moved = false;
      sx = e.clientX;
      dx = 0;
      view.classList.add('drag');
      trackEl.style.transition = 'none';
    });
    addEventListener('pointermove', (e) => {
      if (!down) return;
      dx = e.clientX - sx;
      if (Math.abs(dx) > 6) moved = true;
      trackEl.style.transform = `translateX(${-i * step() + dx}px)`;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      down = false;
      view.classList.remove('drag');
      trackEl.style.transition = '';
      set(i + (Math.round(-dx / step()) || 0));
    });
    view.addEventListener(
      'click',
      (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true,
    );
    addEventListener('resize', () => set(i));
    set(0);
    return { set, get: () => i, max };
  }
  const sS = slider($('#sSlider'), $('#sTrack'), $('#sPrev'), $('#sNext'), $('#sBar'), $('#sCur'));
  const pS = slider($('#pSlider'), $('#pTrack'), $('#pPrev'), $('#pNext'), $('#pBar'));
  $('#sTot').textContent = pad(SERVICE_CARDS.length);
  // Auto-advance both sliders, looping back to the start; hovering or dragging a slider pauses it.
  const autoplay = (s, view, ms) => {
    let hold = false;
    view.addEventListener('pointerenter', () => (hold = true));
    view.addEventListener('pointerleave', () => (hold = false));
    view.addEventListener('focusin', () => (hold = true));
    view.addEventListener('focusout', () => (hold = false));
    setInterval(() => {
      if (document.hidden || reduce || hold) return;
      s.set(s.get() >= s.max() ? 0 : s.get() + 1);
    }, ms);
  };
  autoplay(sS, $('#sSlider'), 4000);
  autoplay(pS, $('#pSlider'), 5500);

  /* ---------- sectors ---------- */
  const rows = $$('.srow'),
    fimgs = $$('#floatImg img'),
    pimgs = $$('#secPreview img');
  const showSec = (k) => {
    rows.forEach((r, j) => r.classList.toggle('on', j === k));
    fimgs.forEach((im, j) => im.classList.toggle('on', j === k));
    pimgs.forEach((im, j) => im.classList.toggle('on', j === k));
  };
  rows.forEach((r, k) => {
    r.addEventListener('mouseenter', () => {
      showSec(k);
      if (fine) fl.classList.add('show');
    });
    r.addEventListener('click', () => showSec(k));
    r.addEventListener('focus', () => showSec(k));
  });
  $('#slist').addEventListener('mouseleave', () => fl.classList.remove('show'));
  showSec(0);

  /* ---------- counters ---------- */
  const fmt = (n) => n.toLocaleString('en-US');
  const cio = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        const el = e.target,
          to = +el.dataset.to;
        if (reduce) {
          el.textContent = fmt(to);
          return;
        }
        const t0 = performance.now();
        const st = (n) => {
          const p = Math.min((n - t0) / 2200, 1);
          el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - p, 4))));
          if (p < 1) requestAnimationFrame(st);
        };
        el.textContent = '0';
        requestAnimationFrame(st);
      }),
    { threshold: 0.6 },
  );
  $$('.count').forEach((c) => cio.observe(c));

  /* ---------- videos ---------- */
  const vio = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) {
          v.play().catch(() => {});
        } else v.pause();
      }),
    { threshold: 0.05 },
  );
  [zv, $('#bandVideo')].forEach((v) => v && vio.observe(v));

  /* ---------- scroll animations ---------- */
  if (G && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    splits.forEach(({ el, words }) =>
      gsap.from(words, {
        yPercent: 115,
        rotate: 3,
        duration: 1.1,
        stagger: 0.05,
        ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 88%' },
      }),
    );
    $$('.rv').forEach((el) =>
      gsap.from(el, {
        y: 34,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 92%' },
      }),
    );
    $$('.sec-head .cap').forEach((c) =>
      gsap.from(c, { x: -20, opacity: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 92%' } }),
    );
    /* zoom origin sits on the left stroke of the blue O so the letter's body, not its hole, fills the screen */
    const zOrigin = () => {
      const o = $('#zO');
      return `${o.offsetLeft + o.offsetWidth * 0.15}px ${o.offsetTop + o.offsetHeight * 0.5}px`;
    };
    const ztl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '+=160%',
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    ztl
      .to('#zintro,#zcue,.zshine', { autoAlpha: 0, duration: 0.1 }, 0) // autoAlpha hides the intro buttons so they can't be clicked once faded
      .fromTo(
        '#zmask',
        { scale: 1, transformOrigin: zOrigin },
        { scale: 140, transformOrigin: zOrigin, ease: 'power3.in', duration: 0.5 }, // smaller two-line headline needs a deeper zoom to fill the screen
        0,
      )
      .to('#zmask', { opacity: 0, duration: 0.05 }, 0.48)
      .to('#zshade', { opacity: 1, duration: 0.15 }, 0.46)
      .set('#hpanelIn', { visibility: 'visible' }, 0.5)
      .fromTo('#hpanelIn', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.15, ease: 'power2.out' }, 0.5)
      .fromTo('#heroTitle .line > span', { yPercent: 110 }, { yPercent: 0, duration: 0.15, stagger: 0.03, ease: 'power3.out' }, 0.5)
      .to('#ztag', { opacity: 1, duration: 0.08 }, 0.62)
      .to({}, { duration: 0.3 }, 0.7);
    gsap.fromTo(
      '.ticker-t',
      { x: 0 },
      { x: -220, ease: 'none', scrollTrigger: { trigger: '.ticker', start: 'top bottom', end: 'bottom top', scrub: true } },
    );
    gsap.from('.scard', {
      y: 110,
      opacity: 0,
      duration: 1.1,
      stagger: 0.08,
      ease: 'power4.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '#sSlider', start: 'top 88%' },
    });
    gsap.from('.scard .img', {
      clipPath: 'inset(0 0 100% 0)',
      duration: 1.3,
      stagger: 0.08,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: '#sSlider', start: 'top 88%' },
    });
    gsap.from('.sbar', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.2,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: '.sbar', start: 'top 95%' },
    });
    // project experience: photo wipes in and drifts on scroll, stat cards rise, accent line draws
    gsap.from('#expPhoto', { clipPath: 'inset(0 100% 0 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: '#experience', start: 'top 72%' } });
    gsap.fromTo('#expPhoto img', { scale: 1.25, yPercent: -5 }, { scale: 1.05, yPercent: 5, ease: 'none', scrollTrigger: { trigger: '#experience', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.from('.exp-stat', { y: 70, opacity: 0, duration: 1.1, stagger: 0.15, ease: 'power3.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: '.exp-stats', start: 'top 92%' } });
    gsap.from('.exp-rule', { scaleX: 0, duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: '.exp-rule', start: 'top 90%' } });
    gsap.from('.pcard', {
      y: 90,
      opacity: 0,
      scale: 0.92,
      duration: 1.1,
      stagger: 0.1,
      ease: 'power4.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '#pSlider', start: 'top 88%' },
    });
    gsap.from('.pcard .img', {
      clipPath: 'inset(100% 0 0 0)',
      duration: 1.3,
      stagger: 0.1,
      ease: 'power4.inOut',
      scrollTrigger: { trigger: '#pSlider', start: 'top 88%' },
    });
    gsap.from('.srow', {
      x: 80,
      opacity: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '#slist', start: 'top 85%' },
    });
    gsap.from('.stat', {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.stats', start: 'top 88%' },
    });
    gsap.to('.stat .t2 i', {
      scaleX: 1,
      duration: 1.8,
      stagger: 0.15,
      ease: 'power3.inOut',
      scrollTrigger: { trigger: '.stats', start: 'top 88%' },
    });
    gsap.fromTo(
      '#bandMedia',
      { yPercent: -8 },
      { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.band', start: 'top bottom', end: 'bottom top', scrub: true } },
    );
    gsap.from('#bandTitle .line > span', {
      yPercent: 110,
      skewY: 5,
      duration: 1.2,
      stagger: 0.14,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.band', start: 'top 70%' },
    });
    gsap.from('.band-side', { borderLeftColor: 'rgba(90,163,232,0)', duration: 1, scrollTrigger: { trigger: '.band', start: 'top 70%' } });
    if ($('#offices')) gsap.from('.office', {
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
      scrollTrigger: { trigger: '#offices', start: 'top 88%' },
    });
    gsap.from('.field,.chip', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#form', start: 'top 80%' },
    });
    gsap.from('#bigword span', {
      yPercent: 100,
      duration: 1.3,
      stagger: 0.06,
      ease: 'power4.out',
      scrollTrigger: { trigger: '#bigword', start: 'top 98%' },
    });
    onLoad(() => ScrollTrigger.refresh());
    setTimeout(() => ScrollTrigger.refresh(), 4000);
  } else {
    $$('.stat .t2 i').forEach((i) => (i.style.transform = 'scaleX(1)'));
  }

  /* ---------- lightbox ---------- */
  const lb = $('#lightbox'),
    lv = $('#lbVideo');
  $('#openFilm').addEventListener('click', () => {
    lb.classList.add('open');
    lv.currentTime = 0;
    lv.play().catch(() => {});
    lenis && lenis.stop();
  });
  const closeLb = () => {
    if (!lb.classList.contains('open')) return;
    lb.classList.remove('open');
    lv.pause();
    lenis && lenis.start();
  };
  $('#lbx').addEventListener('click', closeLb);
  lb.addEventListener('click', (e) => {
    if (e.target === lb) closeLb();
  });

  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLb();
      closeSearch();
      document.body.classList.remove('menu-open');
    }
    if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) {
      e.preventDefault();
      openSearch();
    }
  });
}

export default function PageScript() {
  usePageScript(init);
  return null;
}
