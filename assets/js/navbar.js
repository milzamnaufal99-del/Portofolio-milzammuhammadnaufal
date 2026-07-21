/**
 * navbar.js — Navigation Bar Behaviour
 *
 * All interactivity is observer-based — zero scroll event listeners.
 *
 * Responsibilities:
 *   1. Active link tracking  — one IntersectionObserver per section
 *      (threshold 0.5) keeps aria-current="page" and .active in sync
 *      with the section currently in view.
 *   2. Glassmorphism trigger — a separate IntersectionObserver on #hero
 *      (threshold 0) adds/removes .nav--scrolled on <header> when the
 *      hero section leaves/enters the viewport.
 *   3. Hamburger toggle     — click toggles aria-expanded + .nav--open
 *      on #main-nav.
 *   4. Close on link click  — any .nav__link click closes the mobile menu.
 *   5. Close on Escape      — Escape keydown closes the menu and returns
 *      focus to the hamburger button.
 *
 * Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 4.7
 */

// ── Section IDs that mirror data-nav attributes ───────────────────────────────

const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'timeline',
  'achievements',
  'certificates',
  'contact',
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Returns true when the mobile menu is currently open.
 * @param {HTMLElement} nav - The #main-nav element.
 * @returns {boolean}
 */
function isMenuOpen(nav) {
  return nav.classList.contains('nav--open');
}

/**
 * Opens the mobile navigation overlay.
 * @param {HTMLButtonElement} hamburger
 * @param {HTMLElement} nav
 */
function openMenu(hamburger, nav) {
  hamburger.setAttribute('aria-expanded', 'true');
  nav.classList.add('nav--open');
}

/**
 * Closes the mobile navigation overlay.
 * @param {HTMLButtonElement} hamburger
 * @param {HTMLElement} nav
 * @param {boolean} [returnFocus=false] - Whether to move focus back to the hamburger.
 */
function closeMenu(hamburger, nav, returnFocus = false) {
  hamburger.setAttribute('aria-expanded', 'false');
  nav.classList.remove('nav--open');
  if (returnFocus) {
    hamburger.focus();
  }
}

/**
 * Sets the active state on the nav link that matches `activeSectionId` and
 * clears it from all other links.
 * @param {NodeListOf<Element>} links - All .nav__link elements.
 * @param {string} activeSectionId
 */
function setActiveLink(links, activeSectionId) {
  links.forEach((link) => {
    const matches = link.dataset.nav === activeSectionId;
    link.classList.toggle('active', matches);
    if (matches) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

// ── Main export ───────────────────────────────────────────────────────────────

/**
 * Initialises all navbar behaviour.
 * Safe to call before or after DOMContentLoaded as long as the relevant
 * DOM nodes (`<header>`, `#main-nav`, `#nav-hamburger`) are present.
 */
export function initNavbar() {
  // ── Guard: required DOM elements ─────────────────────────────────────────

  const header = document.querySelector('header');
  if (!header) {
    console.warn('navbar.js: <header> element not found — navbar init aborted.');
    return;
  }

  const nav = document.getElementById('main-nav');
  if (!nav) {
    console.warn('navbar.js: #main-nav element not found — navbar init aborted.');
    return;
  }

  const hamburger = document.getElementById('nav-hamburger');
  if (!hamburger) {
    console.warn('navbar.js: #nav-hamburger element not found — hamburger behaviour skipped.');
  }

  const navLinks = nav.querySelectorAll('.nav__link');
  if (navLinks.length === 0) {
    console.warn('navbar.js: no .nav__link elements found — active-link tracking skipped.');
  }

  // ── 1. Active link tracking ───────────────────────────────────────────────
  // One IntersectionObserver per section at threshold 0.5.
  // When a section is ≥50% visible it becomes the "active" section.

  if (navLinks.length > 0) {
    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) {
        console.warn(`navbar.js: section #${id} not found — skipping active-link observer.`);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveLink(navLinks, id);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(section);
    });
  }

  // ── 2. Glassmorphism trigger ──────────────────────────────────────────────
  // Observe #hero at threshold 0.
  // isIntersecting true  → hero is (partially) in view → transparent header.
  // isIntersecting false → hero has scrolled out        → frosted-glass header.

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          header.classList.toggle('nav--scrolled', !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    heroObserver.observe(heroSection);
  } else {
    console.warn('navbar.js: #hero section not found — glassmorphism trigger skipped.');
  }

  // ── 3. Hamburger toggle ───────────────────────────────────────────────────

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      if (isMenuOpen(nav)) {
        closeMenu(hamburger, nav);
      } else {
        openMenu(hamburger, nav);
      }
    });
  }

  // ── 4. Close on nav link click ────────────────────────────────────────────
  // Delegates to the nav element so it also catches dynamically added links.

  nav.addEventListener('click', (event) => {
    if (event.target.closest('.nav__link') && hamburger) {
      closeMenu(hamburger, nav);
    }
  });

  // ── 5. Close on Escape key ────────────────────────────────────────────────

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && hamburger && isMenuOpen(nav)) {
      closeMenu(hamburger, nav, /* returnFocus */ true);
    }
  });
}
