(function() {
  'use strict';

  const THEME_KEY = 'theme';
  const DARK_CLASS = 'dark';
  const SELECTOR = '[data-theme-toggle]';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {}
  }

  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add(DARK_CLASS);
    } else {
      html.classList.remove(DARK_CLASS);
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    const system = getSystemTheme();
    const theme = stored || system;
    applyTheme(theme);
    updateButtons(theme);
  }

  function updateButtons(theme) {
    const buttons = document.querySelectorAll(SELECTOR);
    buttons.forEach(btn => {
      btn.setAttribute('aria-pressed', theme === 'dark');
      const sunIcon = btn.querySelector('[data-sun-icon]');
      const moonIcon = btn.querySelector('[data-moon-icon]');
      if (sunIcon && moonIcon) {
        if (theme === 'dark') {
          sunIcon.classList.remove('hidden');
          moonIcon.classList.add('hidden');
        } else {
          sunIcon.classList.add('hidden');
          moonIcon.classList.remove('hidden');
        }
      }
    });
  }

  function toggleTheme() {
    const current = document.documentElement.classList.contains(DARK_CLASS) ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    setStoredTheme(next);
    updateButtons(next);
  }

  function handleClick(e) {
    const btn = e.target.closest(SELECTOR);
    if (btn) {
      e.preventDefault();
      toggleTheme();
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const btn = e.target.closest(SELECTOR);
      if (btn) {
        e.preventDefault();
        toggleTheme();
      }
    }
  }

  document.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeyDown);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const stored = getStoredTheme();
    if (!stored) {
      applyTheme(e.matches ? 'dark' : 'light');
      updateButtons(e.matches ? 'dark' : 'light');
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();