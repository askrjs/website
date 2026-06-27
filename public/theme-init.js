(function () {
  var stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch (_error) {
    stored = null;
  }

  var root = document.documentElement;
  var prefersDark =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  var explicitTheme = stored === 'light' || stored === 'dark';
  var nextTheme =
    stored === 'dark' || (!explicitTheme && prefersDark) ? 'dark' : 'light';
  var themeChoice = explicitTheme ? stored : 'system';

  root.setAttribute('data-theme', nextTheme);
  root.setAttribute('data-theme-choice', themeChoice);
})();
