import Site from '@/components/Site';
import { pageMeta } from '@/lib/seo';
import PageScript from '@/components/page-scripts/home';
import { Arrow, ChevronLeft, ChevronRight, Close } from '@/components/icons';
import ServiceIcon from '@/components/home/ServiceIcon';
import EnquiryForm from '@/components/EnquiryForm';
import Contact from '@/components/Contact';
import { FEATURED_PROJECTS, SECTORS, SERVICE_CARDS, pad } from '@/lib/home-data';
import '@/styles/home.css';
import '@/styles/home-contact.css';

export const metadata = pageMeta({
  title: 'Geoporte | Geotechnical & Civil Engineering Consultants',
  description:
    'Geoporte provides geotechnical, civil, structural and telecom engineering design consultancy across Australia and New Zealand, from investigation to delivery.',
  path: '/',
  image: 'https://geoporte.com.au/images/hero-video-poster.jpg',
});

// Hero headline cut out of the dark mask; scrolling zooms through the blue O at ZOOM_O [line, char].
const HERO_WORDS = ['GLOBAL EXPERTISE,', 'LOCAL COMMITMENT'];
const ZOOM_O = [1, 7];

export default function Page() {
  return (
    <Site
      home
      section="home"
      beforeChrome={
        <>
          <div className="loader" id="loader" aria-hidden="true">
            <div className="loader-in">
              <div className="loader-word" id="loaderWord">
                <span>G</span>
                <span>E</span>
                <span className="o">O</span>
                <span>P</span>
                <span>O</span>
                <span>R</span>
                <span>T</span>
                <span>E</span>
              </div>
              <div className="loader-bar">
                <i id="loaderBar" />
              </div>
              <div className="loader-pct" id="loaderPct">
                000
              </div>
            </div>
          </div>
          <div className="loader-panels" id="panels" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
        </>
      }
      beforeHeader={
        <>
          <div className="float-img" id="floatImg">
            {SECTORS.map((s) => (
              <img key={s.title} src={s.img} alt="" />
            ))}
          </div>
        </>
      }
      afterHeader={
        <>
          <div className="search" id="search" role="dialog" aria-label="Search">
            <div className="sbox">
              <input id="sIn" type="search" placeholder="Search services, sectors, projects…" autoComplete="off" />
              <ul className="sres" id="sRes" />
            </div>
          </div>
        </>
      }
      after={
        <>
          <div className="lightbox" id="lightbox" role="dialog" aria-label="Project film">
            <div className="lb">
              <video
                id="lbVideo"
                src="/videos/dusk-bridge.mp4"
                poster="/images/dusk-poster.jpg"
                muted
                playsInline
                loop
                controls
                preload="none"
              />
            </div>
            <button className="lbx" id="lbx" aria-label="Close">
              <Close />
            </button>
          </div>
        </>
      }
    >
      {/* HERO */}
      <section className="hero" id="home">
        <div className="zvid" id="zvid">
          <video
            id="zVid"
            src="/videos/hero-bridge.mp4"
            poster="/images/hero-video-poster.jpg"
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            aria-label="Aerial footage along a steel truss bridge"
          />
        </div>
        <div className="zmask" id="zmask" aria-hidden="true">
          <div className="zword" id="zword">
            {HERO_WORDS.map((line, l) => (
              <div className="zline" key={line}>
                {[...line].map((c, i) =>
                  l === ZOOM_O[0] && i === ZOOM_O[1] ? (
                    <span key={i} className="zo" id="zO">
                      {c}
                    </span>
                  ) : (
                    <span key={i} className={c === ',' ? 'zcomma' : undefined}>
                      {c === ' ' ? ' ' : c}
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="zshine" aria-hidden="true" />
        <div className="zintro" id="zintro">
          <div className="zintro-in">
            <div className="hero-eyebrow" aria-hidden="true">
              Engineering for a connected tomorrow
            </div>
            <p aria-hidden="true">Design · Engineering · Advisory</p>
          </div>
          <div className="zfoot">
            <p className="zsub">
              Civil, geotechnical and structural engineering and advisory for New Zealand&apos;s transport, water, land development and
              resilience projects. Our engineers understand the country&apos;s challenging ground conditions and work closely with councils,
              developers and asset owners to deliver practical, well-engineered solutions.
            </p>
            <div className="zcue" id="zcue">
              <span />
              Scroll to enter
            </div>
          </div>
        </div>
        <div className="zshade" id="zshade" />
        <div className="wrap hero-in" id="hpanelIn">
          <div className="hero-eyebrow" id="heroEyebrow">
            <span>Engineering for a connected tomorrow</span>
          </div>
          <h1 id="heroTitle">
            <span className="line">
              <span>Design</span>
            </span>
            <span className="line">
              <span>Engineering</span>
            </span>
            <span className="line">
              <span className="a">Advisory</span>
            </span>
          </h1>
          <p className="hero-lead" id="heroLead">
            Geoporte leads in risk-based design and management of complex engineering projects.
          </p>
          <div className="hacts">
            <a href="#services" className="clink magnetic" id="heroCta">
              <span className="ring">
                <Arrow />
              </span>
              <span className="t">Explore our work</span>
            </a>{' '}
            <button className="film" id="openFilm" data-cursor="Play">
              <i>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </i>
              Watch film
            </button>
          </div>
        </div>
        <div className="ztag" id="ztag">
          Live · Steel truss bridge
        </div>
      </section>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-t">
          <span>Civil Engineering</span>
          <span>Design &amp; Drafting</span>
          <span>Geotechnical</span>
          <span>Structural</span>
          <span>Stormwater &amp; Flood</span>
          <span>Project Management</span>
          <span>Advisory</span>
          <span>Telecommunications</span> <span>Civil Engineering</span>
          <span>Design &amp; Drafting</span>
          <span>Geotechnical</span>
          <span>Structural</span>
          <span>Stormwater &amp; Flood</span>
          <span>Project Management</span>
          <span>Advisory</span>
          <span>Telecommunications</span>
        </div>
      </div>
      {/* SERVICES */}
      <section className="services" id="services">
        <div className="wrap">
          <div className="head-row">
            <div className="sec-head">
              <div className="cap">What we do</div>
              <h2 className="split">Expertise across the built environment</h2>
            </div>
            <div className="side rv">
              <p>
                From concept to completion, we provide integrated engineering solutions that manage risk, solve complex challenges and
                create enduring value.
              </p>
              <div className="ctrls">
                <a href="#contact" className="tlink">
                  View all services <Arrow />
                </a>
              </div>
            </div>
          </div>
          <div className="slider" id="sSlider" data-cursor="Drag">
            <div className="track" id="sTrack">
              {SERVICE_CARDS.map((s, i) => (
                <a key={s.title} href={s.href || '#contact'} className="scard">
                  <span className="num">{pad(i + 1)}</span>
                  <div className="img">
                    <img src={s.img} alt="" style={{ objectPosition: s.pos }} loading="lazy" />
                  </div>
                  <div className="body">
                    <span className="ic">
                      <ServiceIcon name={s.icon} />
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    <span className="more">
                      LEARN MORE <Arrow />
                    </span>
                  </div>
                  <span className="edge"></span>
                </a>
              ))}
            </div>
          </div>
          <div className="sbar">
            <i id="sBar" />
          </div>
          <div className="ctrls s-ctrls">
            <button className="carr" id="sPrev" aria-label="Previous service">
              <ChevronLeft />
            </button>
            <span className="count-lab">
              <b id="sCur">01</b> / <span id="sTot">08</span>
            </span>
            <button className="carr" id="sNext" aria-label="Next service">
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>
      {/* PROJECT EXPERIENCE */}
      <section className="exp" id="experience">
        <div className="wrap exp-grid">
          <div className="exp-media">
            <div className="exp-photo" id="expPhoto">
              <img src="/images/real/project-experience-team.jpg" alt="Geoporte engineers in hi-vis vests on a site visit" loading="lazy" />
            </div>
            <div className="exp-stats">
              <div className="exp-stat">
                <b>
                  <span className="count" data-to="100">
                    100
                  </span>
                  <em>+</em>
                </b>
                <p>Projects completed by our staff</p>
              </div>
              <div className="exp-stat alt">
                <b>
                  <span className="count" data-to="20">
                    20
                  </span>
                  <em>+</em>
                </b>
                <p>Countries of work experience by our staff</p>
              </div>
            </div>
          </div>
          <div className="exp-copy">
            <div className="sec-head">
              <div className="cap">Experience &amp; Technology</div>
              <h2 className="split">Project Experience</h2>
            </div>
            <span className="exp-rule" />
            <p className="rv">
              GEOPORTE’s specialist staff have decades of extensive combined AU/NZ and global experience on major and complex infrastructure
              projects. Our leaders had worked on various design and construction projects in the building, transport, telecom, energy, water,
              and ports and marine sectors in Europe, Middle East, Asia, New Zealand, and Australia. The glimpses provided are from projects our
              specialists have successfully contributed to while working for other major multinational engineering companies around the world.
            </p>
            <a href="/projects" className="pill pill-a magnetic">
              Learn more <Arrow />
            </a>
          </div>
        </div>
      </section>
      {/* PROJECTS */}
      <section className="projects" id="projects">
        <div className="wrap">
          <div className="ph">
            <div className="lft">
              <div className="sec-head">
                <div className="cap">Featured projects</div>
                <h2 className="split">Real projects. Lasting impact.</h2>
              </div>
            </div>
            <a href="/projects" className="tlink rv">
              View all projects <Arrow />
            </a>
          </div>
          <div className="slider" id="pSlider" data-cursor="Drag">
            <div className="track" id="pTrack">
              {FEATURED_PROJECTS.map((p) => (
                <article key={p.title} className="pcard" data-cursor="View">
                  <span className="loc">{p.loc}</span>
                  <div className="img">
                    <img src={p.img} alt={p.title} loading="lazy" />
                  </div>
                  <span className="scan"></span>
                  <div className="body">
                    <div>
                      <h3>{p.title}</h3>
                      <small>{p.sector}</small>
                    </div>
                    <span className="ring">
                      <Arrow />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="sbar">
            <i id="pBar" />
          </div>
          <div className="ctrls s-ctrls">
            <button className="carr" id="pPrev" aria-label="Previous project">
              <ChevronLeft />
            </button>
            <button className="carr" id="pNext" aria-label="Next project">
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>
      {/* SECTORS */}
      <section className="sectors" id="sectors">
        <div className="wrap sec-grid">
          <div>
            <div className="sec-head">
              <div className="cap">Sectors</div>
              <h2 className="split">Where our engineering makes an impact.</h2>
            </div>
            <p className="rv">Five sectors, one integrated team. Hover a sector to see the work behind it.</p>
            <div className="sec-preview" id="secPreview">
              {SECTORS.map((s, i) => (
                <img key={s.title} src={s.img} alt="" className={i ? '' : 'on'} loading="lazy" />
              ))}
            </div>
          </div>
          <ul className="slist" id="slist">
            {SECTORS.map((s, i) => (
              <li key={s.title}>
                <button className="srow" data-i={i}>
                  <span className="n">{pad(i + 1)}</span>
                  <span>
                    <b>{s.title}</b>
                    <small>{s.text}</small>
                  </span>
                  <span className="ring">
                    <Arrow />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* STATS */}
      <section className="stats" id="stats">
        <div className="wrap stats-grid">
          <div className="stat">
            <b>
              <span className="count" data-to="1000">
                1,000
              </span>
              <em>+</em>
            </b>
            <p>Projects delivered across Australia and New Zealand</p>
            <div className="t2">
              <i />
            </div>
          </div>
          <div className="stat">
            <b>
              <span className="count" data-to="20">
                20
              </span>
              <em>+</em>
            </b>
            <p>Years of combined engineering experience</p>
            <div className="t2">
              <i />
            </div>
          </div>
          <div className="stat">
            <b>
              <span className="count" data-to="8">
                8
              </span>
            </b>
            <p>Specialised engineering disciplines</p>
            <div className="t2">
              <i />
            </div>
          </div>
          <div className="stat">
            <b>
              <span className="count" data-to="100">
                100
              </span>
              <em>%</em>
            </b>
            <p>Commitment to every client and community</p>
            <div className="t2">
              <i />
            </div>
          </div>
        </div>
      </section>
      {/* BAND */}
      <section className="band" id="band">
        <div className="band-media" id="bandMedia">
          <video
            id="bandVideo"
            src="/videos/hero-bridge.mp4"
            poster="/images/hero-video-poster.jpg"
            muted
            playsInline
            loop
            preload="metadata"
            aria-hidden="true"
          />
        </div>
        <div className="wrap band-in">
          <h2 id="bandTitle">
            <span className="line">
              <span>Complex challenges.</span>
            </span>
            <span className="line">
              <span>
                Considered <span className="a">solutions.</span>
              </span>
            </span>
          </h2>
          <div className="band-side rv">
            <p>We work with our clients to navigate complexity, manage risk and deliver engineering outcomes that make a difference.</p>
            <a href="/about-us" className="pill pill-o magnetic">
              About Geoporte <Arrow />
            </a>
          </div>
        </div>
      </section>
      {/* ENQUIRY FORM */}
      <section className="contact" id="enquiry">
        <div className="wrap contact-grid">
          <div>
            <div className="sec-head">
              <div className="cap">Get in touch</div>
              <h2 className="split">Let’s talk about your next project.</h2>
            </div>
            <p className="lead rv">Tell us what you’re planning and the right engineer will get back to you within one business day.</p>
          </div>
          <EnquiryForm />
        </div>
      </section>
      {/* CONTACT DETAILS + MAP */}
      <Contact map />
      <PageScript />
    </Site>
  );
}
