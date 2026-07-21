/**
 * main.js — Application Entry Point
 *
 * ES Module entry point loaded via <script type="module" defer> in index.html.
 * Orchestrates all sub-modules and drives the page initialisation sequence:
 *   1. Lock scroll while the loading screen is visible
 *   2. Render data-driven sections (projects, skills, certificates, etc.)
 *   3. Start scroll-triggered animations
 *   4. Dismiss the loading screen (with a 4-second safety fallback)
 *
 * Requirements: 3.2, 3.3, 3.4
 */

// ── Module Imports ────────────────────────────────────────────────────────────

import {
  renderProjects,
  renderSkills,
  renderCertificates,
  renderTimeline,
  renderAchievements,
  renderSocialLinks,
} from './renderer.js';

import { initScrollAnimations, observeElements } from './animations.js';
import { initNavbar } from './navbar.js';
import { initContactForm } from './form.js';
import { initScrollUI } from './scroll.js';
import { initCursor } from './cursor.js';
import { initParticles } from './particles.js';
import { initTyping } from './typing.js';

// ── Data Imports ──────────────────────────────────────────────────────────────

import { projects }       from '../../data/projects.js';
import { skills }         from '../../data/skills.js';
import { certificates }   from '../../data/certificates.js';
import { timelineEvents } from '../../data/timeline.js';
import { achievements }   from '../../data/achievements.js';
import { socialLinks }    from '../../data/social-links.js';

// ── Loading Screen Logic ──────────────────────────────────────────────────────

/** Flag to prevent dismissLoadingScreen() from running more than once. */
let dismissed = false;

/**
 * Dismisses the loading screen with a CSS fade-out transition.
 *
 * Steps:
 *   1. Guard against double-invocation via the `dismissed` flag.
 *   2. Add `.fade-out` to #loading-screen to trigger the 0.6s opacity
 *      transition defined in loading.css.
 *   3. After 600ms (once the transition completes) add `.hidden` to set
 *      `display: none`, fully removing the overlay from the paint tree.
 *   4. Remove `.is-loading` from <body> to restore normal page scrolling.
 *
 * CSS class contract (defined in loading.css):
 *   #loading-screen.fade-out  → opacity: 0; pointer-events: none
 *   #loading-screen.hidden    → display: none
 *   body.is-loading           → overflow: hidden
 *
 * Requirements: 3.2, 3.3, 3.4
 */
export function dismissLoadingScreen() {
  if (dismissed) return;
  dismissed = true;

  const loadingScreen = document.getElementById('loading-screen');

  if (loadingScreen) {
    // Step 1: trigger the CSS opacity transition (0.6 s ease in loading.css)
    loadingScreen.classList.add('fade-out');

    // Step 2: remove from paint/accessibility tree once transition completes
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 600);
  }

  // Step 3: restore page scrolling regardless of whether the element was found
  document.body.classList.remove('is-loading');
}

// ── 4-Second Safety Fallback ──────────────────────────────────────────────────

/**
 * Force-dismiss the loading screen if it hasn't been dismissed within 4 seconds.
 * Protects against stalled DOMContentLoaded or slow resource loads.
 * Requirements: 3.4
 */
setTimeout(dismissLoadingScreen, 4000);

// ── DOMContentLoaded Initialisation ──────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Lock scroll while loading ───────────────────────────────────────────
  // Adds body.is-loading → overflow: hidden (defined in loading.css).
  // The class is removed inside dismissLoadingScreen() after the fade completes.
  document.body.classList.add('is-loading');

  // ── 2. Render data-driven sections ────────────────────────────────────────
  // All container lookups use optional chaining so that sections not yet in the
  // HTML (added in later tasks) fail silently rather than throwing.

  const projectsGrid = document.querySelector('#projects-grid');
  if (projectsGrid) {
    renderProjects(projects, projectsGrid);

    // Register project cards with the scroll animation observer
    const projectCards = projectsGrid.querySelectorAll('.animate-on-scroll');
    if (projectCards.length) observeElements(Array.from(projectCards));

    // ── Category filter logic ─────────────────────────────────
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const selected = btn.dataset.filter;

        // Update aria-pressed and active class on all buttons
        filterBtns.forEach((b) => {
          b.setAttribute('aria-pressed', 'false');
          b.classList.remove('filter-btn--active');
        });
        btn.setAttribute('aria-pressed', 'true');
        btn.classList.add('filter-btn--active');

        // Show / hide cards by matching data-category
        const cards = projectsGrid.querySelectorAll('.project-card');
        cards.forEach((card) => {
          if (selected === 'all' || card.dataset.category === selected) {
            card.classList.remove('card--hidden');
          } else {
            card.classList.add('card--hidden');
          }
        });
      });
    });
  }

  const skillsGrid = document.querySelector('#skills-grid');
  if (skillsGrid) {
    renderSkills(skills, skillsGrid);

    // Register skill cards with the scroll animation observer
    const skillCards = skillsGrid.querySelectorAll('.animate-on-scroll');
    if (skillCards.length) observeElements(Array.from(skillCards));
  }

  const certificatesGrid = document.querySelector('#certificates-grid');
  if (certificatesGrid) {
    renderCertificates(certificates, certificatesGrid);

    // Register certificate cards with the scroll animation observer
    const certCards = certificatesGrid.querySelectorAll('.animate-on-scroll');
    if (certCards.length) observeElements(Array.from(certCards));
  }

  const timelineList = document.querySelector('#timeline-list');
  if (timelineList) {
    renderTimeline(timelineEvents, timelineList);

    // Register timeline items with the scroll animation observer
    const timelineItems = timelineList.querySelectorAll('.animate-on-scroll');
    if (timelineItems.length) observeElements(Array.from(timelineItems));
  }

  const achievementsGrid = document.querySelector('#achievements-grid');
  if (achievementsGrid) {
    renderAchievements(achievements, achievementsGrid);

    // Register .achievement blocks with the scroll animation observer so the
    // IntersectionObserver callback can fire the counter animation on scroll.
    const achievementBlocks = achievementsGrid.querySelectorAll('.achievement.animate-on-scroll');
    if (achievementBlocks.length) observeElements(Array.from(achievementBlocks));
  }

  const socialLinksContainer = document.querySelector('#social-links-grid');
  if (socialLinksContainer) {
    renderSocialLinks(socialLinks, socialLinksContainer);

    // Register social links with the scroll animation observer
    const socialItems = socialLinksContainer.querySelectorAll('.animate-on-scroll');
    if (socialItems.length) observeElements(Array.from(socialItems));
  }

  // ── 3. Initialise scroll animations ───────────────────────────────────────
  // Sets up the IntersectionObserver that reveals .animate-on-scroll elements.
  initScrollAnimations();

  // ── 3b. Initialise navbar behaviour ───────────────────────────────────────
  // Active-link tracking, glassmorphism trigger, hamburger, Escape key.
  initNavbar();

  // ── 3c. Initialise contact form validation ─────────────────────────────────
  // Attaches submit validation and per-field error clearing.
  // Requirements: 12.2, 12.3, 12.4, 20.7
  initContactForm(document.getElementById('contact-form'));

  // ── 3d. Initialise scroll progress bar and scroll-to-top button ────────────
  // Wires #scroll-progress width updates and #scroll-to-top visibility.
  // Requirements: 14.1–14.4, 15.1–15.5, 22.6
  initScrollUI();

  // ── 3e. Initialise custom cursor ───────────────────────────────────────────
  // Two-layer cursor (dot + ring) on pointer-fine (mouse) devices only.
  // Requirements: 16.1–16.5
  initCursor();

  // ── 3f. Initialise canvas particle system ──────────────────────────────────
  // Animated particle network in the hero section canvas.
  // Requirements: 17.1–17.6
  const particlesCanvas = document.getElementById('particles-canvas');
  if (particlesCanvas) {
    initParticles(particlesCanvas);
  } else {
    console.warn('main.js: #particles-canvas element not found — particles skipped.');
  }

  // ── 3g. Initialise typewriter animation ────────────────────────────────────
  // Cycles through role phrases in the hero subtitle.
  // Requirements: 5.1, 5.2
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    initTyping(typingEl, [
      'Software Developer',
      'IoT Engineer',
      'AI-Assisted Developer',
    ]);
  } else {
    console.warn('main.js: #typing-text element not found — typing animation skipped.');
  }

  // ── 4. Set footer copyright year ──────────────────────────────────────────
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();

  // ── 5. Dismiss loading screen (normal path) ────────────────────────────────
  dismissLoadingScreen();
});
