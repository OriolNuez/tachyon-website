(() => {
  'use strict';
  const site = window.TACHYON_SITE || {};
  const $ = selector => document.querySelector(selector);
  const https = value => typeof value === 'string' && /^https:\/\//.test(value);

  // The page's one moment of motion: Tachyon's line types out, as it does in the app.
  // The full sentence is in the page from the start, so screen readers and search see all of it.
  const line = $('[data-type]');
  if (line && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const text = line.textContent;
    const shown = document.createElement('span'), rest = document.createElement('span');
    rest.className = 'unread'; rest.textContent = text;
    line.setAttribute('aria-label', text);
    shown.setAttribute('aria-hidden', 'true'); rest.setAttribute('aria-hidden', 'true');
    line.replaceChildren(shown, rest);
    let count = 0;
    const paint = () => { shown.textContent = text.slice(0, count); rest.textContent = text.slice(count); };
    const finish = () => { count = text.length; paint(); clearInterval(timer); };
    const timer = setInterval(() => { count = Math.min(text.length, count + 2); paint(); if (count >= text.length) clearInterval(timer); }, 30);
    line.addEventListener('click', finish);
    document.addEventListener('keydown', finish, { once: true });
  }

  // Links appear only once they point somewhere real.
  const releases = site.releasesUrl || (https(site.repositoryUrl) ? site.repositoryUrl.replace(/\/$/, '') + '/releases' : '');
  if (https(site.repositoryUrl)) { const repo = $('#repo'); repo.href = site.repositoryUrl; repo.hidden = false; }
  if (https(releases)) { const all = $('#releases'); all.href = releases; all.hidden = false; }
  if (site.releaseLabel) $('#release-status').textContent = site.releaseLabel;

  const systems = { mac: 'macOS', windows: 'Windows' };
  const download = $('#download'), help = $('#download-help');
  function choose(key) {
    document.querySelectorAll('[data-os]').forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.os === key)));
    const href = (site.downloads || {})[key];
    if (https(href)) {
      download.href = href; download.removeAttribute('aria-disabled');
      download.textContent = 'Download for ' + systems[key];
      help.textContent = 'The download comes from the official release on GitHub.';
    } else {
      download.href = '#install'; download.setAttribute('aria-disabled', 'true');
      download.textContent = 'Download coming soon';
      help.textContent = 'No ' + systems[key] + ' download has been published yet.';
    }
  }
  download.addEventListener('click', event => { if (download.getAttribute('aria-disabled') === 'true') event.preventDefault(); });
  document.querySelectorAll('[data-os]').forEach(tab => tab.addEventListener('click', () => choose(tab.dataset.os)));
  choose(/Win/.test(navigator.userAgent) ? 'windows' : 'mac');
})();
