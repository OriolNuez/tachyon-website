(() => {
  'use strict';
  const cfg = window.TACHYON_SITE || {};
  const $ = (selector) => document.querySelector(selector);
  const nav = $('#site-nav');
  const toggle = $('#menu-toggle');
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
  }));

  const repository = cfg.repositoryUrl || '';
  const releasePage = cfg.releasesUrl || (repository ? repository.replace(/\/$/,'') + '/releases' : '');
  if (repository) for (const id of ['nav-repo','footer-repo']) { const a = $('#' + id); a.href = repository; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
  if (releasePage) { $('#releases-link').href = releasePage; $('#releases-link').target='_blank'; $('#releases-link').rel='noopener noreferrer'; }
  else { $('#releases-link').addEventListener('click', ev => ev.preventDefault()); }

  const shotData = {
    home: ['assets/screen-home.webp','Tachyon Village welcome screen concept','An inviting pixel-art village to start your day.'],
    cadences: ['assets/screen-cadences.webp','Tachyon Village existing cadences concept','Your campaigns at a glance, with room to focus.'],
    workspace: ['assets/screen-workspace.webp','Tachyon Village cadence workspace concept','Accounts, contacts and outreach organised around the work.'],
    calendar: ['assets/screen-calendar.webp','Tachyon Village monthly calendar concept','Your schedule, without the clutter.'],
    import: ['assets/screen-import.webp','Tachyon Village embedded import flow concept','A guided import experience; browser embedding depends on the desktop build.']
  };
  const shotImg = $('#feature-screenshot');
  document.querySelectorAll('[data-shot]').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('[data-shot]').forEach(other => { other.classList.remove('active'); other.setAttribute('aria-selected','false'); });
    btn.classList.add('active'); btn.setAttribute('aria-selected','true');
    const [src,alt,caption] = shotData[btn.dataset.shot];
    shotImg.src = src; shotImg.alt = alt; $('#shot-caption').textContent = caption;
  }));

  const systems = {
    mac: { name:'macOS', description:'Download the signed macOS installer when available. Open the installer and follow the on-screen steps.', action:'Download for macOS' },
    windows: { name:'Windows', description:'Download the Windows installer when available. Run it and follow the installation wizard.', action:'Download for Windows' },
    linux: { name:'Linux', description:'Download the Linux package when available. Follow the instructions included with that release.', action:'Download for Linux' }
  };
  function chooseOS(key) {
    const sys = systems[key];
    document.querySelectorAll('[data-os]').forEach(btn => { const selected = btn.dataset.os === key; btn.classList.toggle('active',selected); btn.setAttribute('aria-selected',String(selected)); });
    $('#os-title').textContent = 'Install on ' + sys.name;
    $('#os-description').textContent = sys.description;
    const href = (cfg.downloads || {})[key]; const link = $('#download-btn');
    if (href && /^https:\/\//.test(href)) {
      link.href=href; link.classList.remove('is-disabled'); link.removeAttribute('aria-disabled'); link.setAttribute('target','_blank'); link.setAttribute('rel','noopener noreferrer');
      $('#download-label').textContent=sys.action;
      $('#install-helper').textContent='Download opens the official installer hosted at the configured release URL.';
    } else {
      link.href='#install'; link.classList.add('is-disabled'); link.setAttribute('aria-disabled','true'); link.removeAttribute('target');
      $('#download-label').textContent='Download coming soon';
      $('#install-helper').textContent='No public ' + sys.name + ' installer has been configured yet.';
    }
  }
  document.querySelectorAll('[data-os]').forEach(btn => btn.addEventListener('click',()=>chooseOS(btn.dataset.os)));
  $('#download-btn').addEventListener('click', e => {if ($('#download-btn').getAttribute('aria-disabled') === 'true') e.preventDefault();});
  if (cfg.releaseLabel) $('#release-status').textContent=cfg.releaseLabel;
  chooseOS(/Win/.test(navigator.platform)?'windows':/Linux/.test(navigator.platform)?'linux':'mac');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');obs.unobserve(entry.target);}}),{threshold:.09});
    document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
  } else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));

  // Ambient particles: presentation-only, disabled under reduced motion.
  const canvas=$('#ambient'); const ctx=canvas.getContext('2d');
  if (!ctx || prefersReduced.matches) { canvas.style.display='none'; return; }
  let w=0,h=0,ratio=1,particles=[],frame=0,raf=0;
  function size() { ratio=Math.min(devicePixelRatio||1,2); w=window.innerWidth;h=window.innerHeight;canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(ratio,0,0,ratio,0,0);particles=Array.from({length:Math.min(72,Math.max(24,Math.floor(w*h/22000)))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.35+.3,v:Math.random()*.16+.035,phase:Math.random()*7})); }
  function render(){if(document.hidden){raf=0;return;}ctx.clearRect(0,0,w,h);frame++;for(const p of particles){const a=.15+.23*(.5+.5*Math.sin(frame*.014+p.phase));ctx.fillStyle=`rgba(252,228,195,${a})`;ctx.fillRect(Math.round(p.x),Math.round(p.y),Math.ceil(p.r*2),Math.ceil(p.r*2));p.y-=p.v;if(p.y<-8){p.y=h+8;p.x=Math.random()*w;}}raf=requestAnimationFrame(render);}
  window.addEventListener('resize',size,{passive:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!raf)raf=requestAnimationFrame(render);});
  prefersReduced.addEventListener?.('change',()=>{cancelAnimationFrame(raf);raf=0;canvas.style.display=prefersReduced.matches?'none':'block';if(!prefersReduced.matches){size();render();}});
  size();render();
})();
