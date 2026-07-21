/**
 * animations.js — Intersection Observer Manager
 *
 * Manages scroll-triggered reveal animations for all elements
 * marked with the `.animate-on-scroll` class.
 *
 * CSS counterpart: assets/css/animations.css
 *   .animate-on-scroll          { opacity: 0; transform: translateY(24px); transition: … }
 *   .animate-on-scroll.is-visible { opacity: 1; transform: none; }
 */

/** @type {IntersectionObserver|null} */
let observer = null;

/**
 * Initialises the global scroll animation observer.
 *
 * - Creates one shared `IntersectionObserver` (threshold 0.15).
 * - Observes every existing `.animate-on-scroll` element in the document.
 * - When an element intersects the viewport, `.is-visible` is added and the
 *   element is immediately unobserved (fire-once behaviour).
 *
 * Fallback: if `IntersectionObserver` is not available in `window`,
 * all `.animate-on-scroll` elements receive `.is-visible` immediately
 * so content is never hidden from users on unsupported browsers.
 *
 * Requirements: 6.5, 6.6, 7.5, 8.6, 9.6, 10.3, 11.4, 12.7
 */
export function initScrollAnimations() {
  // Graceful fallback for environments without IntersectionObserver support
  if (!('IntersectionObserver' in window)) {
    document
      .querySelectorAll('.animate-on-scroll')
      .forEach((el) => el.classList.add('is-visible'));
    return;
  }

  // Create the shared observer instance
  observer = new IntersectionObserver(_onIntersect, { threshold: 0.15 });

  // Register all elements already in the DOM at init time
  document
    .querySelectorAll('.animate-on-scroll')
    .forEach((el) => observer.observe(el));
}

/**
 * Registers additional elements for scroll-triggered animation.
 *
 * Use this after `initScrollAnimations()` to observe elements that were
 * added to the DOM dynamically (e.g. cards rendered asynchronously).
 * If `IntersectionObserver` was unavailable at init time, the elements
 * receive `.is-visible` immediately instead.
 *
 * @param {HTMLElement[]} elements — array of DOM elements to observe
 */
export function observeElements(elements) {
  if (!Array.isArray(elements) || elements.length === 0) return;

  // Fallback path: observer was never created, reveal immediately
  if (!observer) {
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
    } else {
      // observer hasn't been initialised yet; init it first, then observe
      initScrollAnimations();
      // Elements passed here are new — observe them via the now-ready observer
      elements.forEach((el) => {
        if (el && !el.classList.contains('is-visible')) {
          observer.observe(el);
        }
      });
    }
    return;
  }

  elements.forEach((el) => {
    if (el && !el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
}

/**
 * IntersectionObserver callback.
 * Adds `.is-visible` to each intersecting entry and immediately unobserves
 * it so the animation fires only once.
 * Also triggers counter animations for any `.achievement__counter` elements
 * found inside the intersecting target.
 *
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} obs
 */
function _onIntersect(entries, obs) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);

      // Start counter animation for any counter elements inside this block
      entry.target
        .querySelectorAll('.achievement__counter[data-target]')
        .forEach(_animateCounter);
    }
  });
}

// ── Achievement Counter Animation ────────────────────────────────────────────

/**
 * Animates an achievement counter element from 0 to its `data-target` value
 * over `data-duration` milliseconds using an ease-out cubic easing function.
 *
 * Fire-once guarantee: the element is skipped if `data-animated="true"` is
 * already set, and the attribute is set to "true" once the animation completes.
 *
 * Easing formula: value = target * (1 - Math.pow(1 - progress, 3))
 *
 * @param {HTMLElement} el — the `.achievement__counter` span element
 */
function _animateCounter(el) {
  // Fire-once guard: skip if already animated
  if (el.dataset.animated === 'true') return;

  const target   = Number(el.dataset.target)   || 0;
  const duration = Number(el.dataset.duration) || 1500;
  const startTime = performance.now();

  /**
   * @param {DOMHighResTimeStamp} now
   */
  function tick(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out cubic: accelerates then decelerates towards target
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);

    el.textContent = String(current);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      // Guarantee the final value is exact
      el.textContent = String(target);
      el.dataset.animated = 'true';
    }
  }

  requestAnimationFrame(tick);
}
