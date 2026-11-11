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
  if (https(site.repositoryUrl)) { const repo = $('#repo'); repo.href = site.repositoryUrl; repo.hidden = false; }
  if (https(site.releasesUrl)) $('#releases').href = site.releasesUrl;
  if (site.releaseLabel) $('#release-status').textContent = site.releaseLabel;

  // Without script both systems' instructions show; with it, the tabs pick one (Windows visitors start on Windows).
  const tabs = [...document.querySelectorAll('[data-os]')];
  function choose(key, focus) {
    for (const tab of tabs) {
      const on = tab.dataset.os === key;
      tab.setAttribute('aria-selected', String(on)); tab.tabIndex = on ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !on;
      if (on && focus) tab.focus();
    }
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => choose(tab.dataset.os));
    tab.addEventListener('keydown', event => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      choose(tabs[(i + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length].dataset.os, true);
    });
  });
  choose(/Win/.test(navigator.userAgent) ? 'windows' : 'mac');

  // Copy buttons for the install lines. If the clipboard isn't available, the line is selected to copy by hand.
  const status = $('#copy-status');
  document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    const code = document.getElementById(button.dataset.copy);
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = 'Copied'; status.textContent = 'Install line copied.';
      setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    } catch {
      const range = document.createRange(); range.selectNodeContents(code);
      const selection = getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Install line selected. Press Command C or Control C to copy it.';
    }
  }));
})();
