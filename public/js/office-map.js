/* Office map: Google Maps embed in #officeMap with one button per office (the free embed shows one place at a time).
   Office cards whose <b> text matches a city switch the map to that office. */
(function(){
  const el=document.getElementById('officeMap');
  if(!el)return;

  const OFFICES=[
    {city:'Auckland',country:'New Zealand',addr:'110 Carlton Gore Road, New Market, Auckland, New Zealand 1023'}
  ];

  const css=`
.c-map{position:relative;margin-top:2px;background:var(--card);border:1px solid var(--line);overflow:hidden}
.c-map .map-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:14px 16px;border-bottom:1px solid var(--line)}
.c-map .map-tag{font-size:.56rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:var(--fg)}
.c-map .map-tag b{color:var(--amber);font-weight:700}
.c-map .map-chips{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:6px}
.c-map .map-chips button{padding:7px 13px;border-radius:999px;background:rgba(10,10,12,.82);border:1px solid var(--line-2);font-size:.72rem;color:rgba(242,240,236,.85);transition:background .3s,color .3s,border-color .3s}
.c-map .map-chips button:hover{border-color:var(--amber);color:var(--amber)}
.c-map .map-chips button.on{background:var(--amber);border-color:var(--amber);color:#111}
.c-map .map{display:block;width:100%;height:clamp(340px,48vw,500px);border:0;background:#0d0e12}
.office[role=button]{cursor:pointer}
.office.map-on{border-color:var(--amber)}
@media (max-width:560px){.c-map .map-head{flex-direction:column;align-items:flex-start}.c-map .map-chips{justify-content:flex-start}}`;
  const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  const n=OFFICES.length;
  el.innerHTML=`<div class="map-head"><div class="map-tag"><b>${n}</b> ${n>1?'offices':'office'} · New Zealand</div><div class="map-chips" role="group" aria-label="Show office on map">${OFFICES.map((o,i)=>`<button type="button" data-k="${i}">${o.city}</button>`).join('')}</div></div><iframe class="map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
  const frame=el.querySelector('iframe');
  const chips=[...el.querySelectorAll('.map-chips button')];
  const cards=[...document.querySelectorAll('.office')].map(c=>{const b=c.querySelector('b');const k=b?OFFICES.findIndex(o=>b.textContent.trim().startsWith(o.city)):-1;return{c,k}}).filter(x=>x.k>-1);

  function select(k){
    const o=OFFICES[k];
    frame.src='https://www.google.com/maps?q='+encodeURIComponent(o.addr)+'&z=15&output=embed';
    frame.title=`Map of the Geoporte ${o.city} office`;
    chips.forEach(b=>b.classList.toggle('on',+b.dataset.k===k));
    cards.forEach(({c,k:j})=>c.classList.toggle('map-on',j===k));
  }
  chips.forEach(b=>b.addEventListener('click',()=>select(+b.dataset.k)));
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  cards.forEach(({c,k})=>{c.setAttribute('role','button');c.tabIndex=0;c.setAttribute('aria-label',`Show ${OFFICES[k].city} office on map`);
    const go=()=>{select(k);el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'})};
    c.addEventListener('click',e=>{if(e.target.closest('a'))return;go()});
    c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})});

  select(0); // Melbourne head office
})();
