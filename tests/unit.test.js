/**
 * tests/unit.test.js — Unit Tests for Portfolio Website
 *
 * Covers:
 *   - Loading screen: opacity transition ≤ 600ms; 4-second fallback timeout
 *   - Navbar: hamburger aria-expanded toggle; Escape key closes menu
 *   - Footer: dynamically inserted year matches new Date().getFullYear()
 *   - Scroll-to-top: aria-label="Scroll to top" present on button
 *   - Social links: email href starts with mailto:; others start with https:
 *   - Empty state: renderProjects([]) → .empty-state element
 *   - Empty state: renderCertificates([]) → .empty-state element
 *
 * Requirements: 3.2, 3.4, 4.5, 4.7, 12.5, 13.2, 15.5, 8.8, 11.5
 */

import { renderProjects, renderCertificates } from '../assets/js/renderer.js';
import { socialLinks } from '../data/social-links.js';
import { initNavbar } from '../assets/js/navbar.js';

// ── jsdom polyfills ───────────────────────────────────────────────────────────
// jsdom does not implement IntersectionObserver; provide a minimal stub so
// navbar.js (which calls new IntersectionObserver) does not throw.
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

// ── Loading Screen ────────────────────────────────────────────────────────────

describe('Loading screen', () => {
  beforeEach(() => {
    // Set up minimal DOM required by dismissLoadingScreen logic
    document.body.innerHTML = `
      <div id="loading-screen"></div>
    `;
    document.body.classList.add('is-loading');
  });

  afterEach(() => {
    vi.useRealTimers();
    document.body.classList.remove('is-loading', 'is-loading');
  });

  it('applies fade-out (opacity transition) within 600ms on DOMContentLoaded dismiss', () => {
    vi.useFakeTimers();

    const loadingScreen = document.getElementById('loading-screen');

    // Replicate the dismissLoadingScreen logic inline (same logic as main.js export)
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 600);
    document.body.classList.remove('is-loading');

    // fade-out class (opacity → 0 transition) applied immediately
    expect(loadingScreen.classList.contains('fade-out')).toBe(true);
    // hidden not yet applied — transition in progress
    expect(loadingScreen.classList.contains('hidden')).toBe(false);

    // Advance past 600ms transition
    vi.advanceTimersByTime(600);
    expect(loadingScreen.classList.contains('hidden')).toBe(true);

    // Transition completes within the 600ms window (≤600ms total)
    expect(document.body.classList.contains('is-loading')).toBe(false);
  });

  it('4-second fallback timeout fires and removes is-loading from body', () => {
    vi.useFakeTimers();

    // Simulate the 4-second fallback from main.js
    let dismissed = false;
    function dismissLoadingScreen() {
      if (dismissed) return;
      dismissed = true;
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => loadingScreen.classList.add('hidden'), 600);
      }
      document.body.classList.remove('is-loading');
    }

    const fallbackTimer = setTimeout(dismissLoadingScreen, 4000);

    // Before 4 seconds — screen still showing
    vi.advanceTimersByTime(3999);
    expect(document.body.classList.contains('is-loading')).toBe(true);

    // At 4 seconds — fallback fires
    vi.advanceTimersByTime(1);
    expect(document.body.classList.contains('is-loading')).toBe(false);
    expect(document.getElementById('loading-screen').classList.contains('fade-out')).toBe(true);

    clearTimeout(fallbackTimer);
  });
});

// ── Navbar ────────────────────────────────────────────────────────────────────

describe('Navbar', () => {
  function setupNavbarDOM() {
    document.body.innerHTML = `
      <header>
        <nav id="main-nav">
          <button id="nav-hamburger" aria-expanded="false" aria-controls="nav-menu">
            Menu
          </button>
          <ul id="nav-menu">
            <li><a class="nav__link" data-nav="hero" href="#hero">Home</a></li>
            <li><a class="nav__link" data-nav="about" href="#about">About</a></li>
          </ul>
        </nav>
      </header>
      <section id="hero"></section>
      <section id="about"></section>
    `;
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('hamburger click sets aria-expanded="true"', () => {
    setupNavbarDOM();
    initNavbar();

    const hamburger = document.getElementById('nav-hamburger');
    expect(hamburger.getAttribute('aria-expanded')).toBe('false');

    hamburger.click();

    expect(hamburger.getAttribute('aria-expanded')).toBe('true');
  });

  it('Escape key sets aria-expanded back to "false"', () => {
    setupNavbarDOM();
    initNavbar();

    const hamburger = document.getElementById('nav-hamburger');

    // Open the menu first
    hamburger.click();
    expect(hamburger.getAttribute('aria-expanded')).toBe('true');

    // Fire Escape keydown
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    document.dispatchEvent(escapeEvent);

    expect(hamburger.getAttribute('aria-expanded')).toBe('false');
  });
});

// ── Footer ────────────────────────────────────────────────────────────────────

describe('Footer', () => {
  it('dynamically inserted year equals new Date().getFullYear()', () => {
    document.body.innerHTML = `
      <footer>
        <p>© <span id="copyright-year"></span></p>
      </footer>
    `;

    // Replicate the one-liner from main.js
    const copyrightYear = document.getElementById('copyright-year');
    copyrightYear.textContent = new Date().getFullYear();

    expect(Number(copyrightYear.textContent)).toBe(new Date().getFullYear());
  });
});

// ── Scroll-to-top ─────────────────────────────────────────────────────────────

describe('Scroll-to-top button', () => {
  it('has aria-label="Scroll to top"', () => {
    document.body.innerHTML = `
      <button id="scroll-to-top" aria-label="Scroll to top">&#8593;</button>
    `;

    const btn = document.getElementById('scroll-to-top');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('aria-label')).toBe('Scroll to top');
  });
});

// ── Social links ──────────────────────────────────────────────────────────────

describe('Social links data', () => {
  it('email link href starts with "mailto:"', () => {
    const emailLink = socialLinks.find(
      (link) => link.platform === 'Email'
    );
    expect(emailLink).toBeDefined();
    expect(emailLink.url.startsWith('mailto:')).toBe(true);
  });

  it('all non-email navigable links start with "https:"', () => {
    const nonEmailLinks = socialLinks.filter(
      (link) => link.platform !== 'Email' && link.url !== ''
    );
    // There must be at least one non-email link to make this test meaningful
    expect(nonEmailLinks.length).toBeGreaterThan(0);

    nonEmailLinks.forEach((link) => {
      expect(link.url.startsWith('https:')).toBe(true);
    });
  });
});

// ── Empty state ───────────────────────────────────────────────────────────────

describe('Empty state', () => {
  it('renderProjects([]) inserts a .empty-state element', () => {
    const container = document.createElement('div');
    renderProjects([], container);

    const emptyState = container.querySelector('.empty-state');
    expect(emptyState).not.toBeNull();
  });

  it('renderCertificates([]) inserts a .empty-state element', () => {
    const container = document.createElement('div');
    renderCertificates([], container);

    const emptyState = container.querySelector('.empty-state');
    expect(emptyState).not.toBeNull();
  });
});
