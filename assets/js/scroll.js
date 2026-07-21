/**
 * scroll.js — Scroll Progress Bar & Scroll-to-Top Button
 *
 * Exports a single `initScrollUI()` function that wires up:
 *   • #scroll-progress  — a fixed top bar whose width tracks how far the user
 *                          has scrolled through the page (Requirements 14.1–14.4)
 *   • #scroll-to-top    — a fixed button that appears after 400 px of scrolling
 *                          and smooth-scrolls back to the top on click
 *                          (Requirements 15.1–15.5, 22.6)
 *
 * Performance: all DOM writes happen inside a single requestAnimationFrame
 * callback guarded by a `ticking` flag so at most one rAF is queued per
 * scroll event (the standard "scroll + rAF" throttle pattern).
 *
 * No setInterval is used anywhere in this module.
 */

// ── Visible-class constant ────────────────────────────────────────────────────

const VISIBLE_CLASS = 'scroll-to-top--visible';

// ── Exported initialiser ──────────────────────────────────────────────────────

/**
 * Initialise scroll-UI components.
 *
 * Looks up #scroll-progress and #scroll-to-top in the DOM.  If either element
 * is absent a console warning is emitted and the function returns early so the
 * rest of the page continues to work normally.
 *
 * Requirements: 14.1, 14.2, 14.3, 14.4, 15.1, 15.2, 15.3, 15.4, 15.5, 22.6
 */
export function initScrollUI() {
  const progressBar  = document.getElementById('scroll-progress');
  const scrollBtn    = document.getElementById('scroll-to-top');

  // Guard: both elements must exist before attaching any listeners
  if (!progressBar) {
    console.warn('initScrollUI: #scroll-progress element not found.');
    return;
  }
  if (!scrollBtn) {
    console.warn('initScrollUI: #scroll-to-top element not found.');
    return;
  }

  // ── rAF throttle state ──────────────────────────────────────────────────────

  /**
   * `ticking` prevents multiple rAF calls from being queued for a single burst
   * of scroll events.  It is set to `true` when a frame is scheduled and reset
   * to `false` inside the frame callback once the DOM has been updated.
   */
  let ticking = false;

  // ── Update helpers ──────────────────────────────────────────────────────────

  /**
   * Compute the current scroll percentage and apply it to the progress bar's
   * inline width.
   *
   * Division-by-zero guard: when the document is shorter than (or equal to) the
   * viewport, `scrollableHeight` will be 0 or negative.  In that case the bar
   * is set to 100 % because the whole page is already visible.
   *
   * Requirements: 14.1, 14.2, 14.3
   */
  function updateProgress() {
    const scrollY         = window.scrollY;
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    let pct;
    if (scrollableHeight <= 0) {
      // Entire page fits in the viewport — consider it fully "scrolled"
      pct = 100;
    } else {
      pct = (scrollY / scrollableHeight) * 100;
      // Clamp to [0, 100] to handle any sub-pixel overshoots
      if (pct < 0)   pct = 0;
      if (pct > 100) pct = 100;
    }

    progressBar.style.width = pct + '%';

    // Keep aria-valuenow in sync for assistive technologies (Requirement 22.6)
    progressBar.setAttribute('aria-valuenow', Math.round(pct));
  }

  /**
   * Show or hide the scroll-to-top button depending on how far the user has
   * scrolled.  The button becomes visible after 400 px.
   *
   * Requirements: 15.2, 15.3
   */
  function updateScrollBtn() {
    if (window.scrollY > 400) {
      scrollBtn.classList.add(VISIBLE_CLASS);
    } else {
      scrollBtn.classList.remove(VISIBLE_CLASS);
    }
  }

  // ── Scroll event → rAF throttle ────────────────────────────────────────────

  /**
   * Scroll handler: if no frame is already queued, schedule one.
   * Both DOM updates happen together inside a single frame to minimise layout
   * thrashing.
   *
   * Requirements: 14.4, 15.4
   */
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        updateScrollBtn();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Button click — smooth scroll to top ────────────────────────────────────

  /**
   * Smooth-scroll to the top of the page when the button is clicked.
   * `behavior: 'smooth'` is supported in all modern browsers; older browsers
   * will fall back to an instant jump (acceptable graceful degradation).
   *
   * Requirements: 15.1, 15.5
   */
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Run once on init to reflect the current scroll position ────────────────
  // Handles the case where the page is reloaded mid-scroll or navigated to
  // with a hash fragment that pushes the view down the page.

  updateProgress();
  updateScrollBtn();
}
