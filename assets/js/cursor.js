/**
 * cursor.js — Custom Cursor Module
 *
 * Provides a two-layer custom cursor experience on pointer-fine (mouse)
 * devices:
 *   • `#cursor-dot`  — small solid circle that tracks the pointer exactly
 *   • `#cursor-ring` — larger ring that lerps toward the pointer each
 *                      requestAnimationFrame tick (smooth lag effect)
 *
 * The module is a no-op on touch / coarse-pointer devices, and degrades
 * gracefully if the DOM elements are absent.
 *
 * Requirements: 16.1, 16.2, 16.3, 16.4, 16.5
 */

/**
 * Initialise the custom cursor.
 *
 * Steps:
 *   1. Guard: test `window.matchMedia('(pointer: fine)')` — skip on touch.
 *   2. Locate `#cursor-dot` and `#cursor-ring`; warn + bail if missing.
 *   3. Add `cursor-active` class to `<body>` (CSS sets `cursor: none`).
 *   4. Listen for `pointermove` to update dot position instantly.
 *   5. Run a `requestAnimationFrame` loop to lerp the ring toward the mouse.
 *   6. Delegate `pointerover` / `pointerout` on `document` to toggle
 *      `.cursor-hover` on the ring when over interactive elements.
 *
 * @returns {void}
 */
export function initCursor() {
  // ── 1. Guard: pointer-fine check ───────────────────────────────────────────
  // Wrapped in try/catch so environments that throw on matchMedia (e.g.
  // some SSR contexts) still fail silently.
  try {
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return; // touch / coarse device — no-op
  } catch (_err) {
    return; // matchMedia unsupported or threw — no-op
  }

  // ── 2. Locate cursor DOM elements ──────────────────────────────────────────
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) {
    console.warn(
      '[cursor.js] initCursor: #cursor-dot or #cursor-ring element not found in the DOM.'
    );
    return;
  }

  // ── 3. Activate custom cursor (CSS hides native cursor on this class) ──────
  document.body.classList.add('cursor-active');

  // ── 4. Mouse tracking state ────────────────────────────────────────────────
  let mouseX = 0;
  let mouseY = 0;

  // Ring interpolation state (starts off-screen so it doesn't flash at 0,0)
  let ringX = -100;
  let ringY = -100;

  // ── 5. Instant dot follow ──────────────────────────────────────────────────
  document.addEventListener('pointermove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    // Dot tracks exactly — set via style for sub-pixel accuracy
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  // ── 6. rAF lerp loop for ring ──────────────────────────────────────────────
  // Interpolation factor: higher = snappier, lower = more lag.
  const LERP_FACTOR = 0.12;

  /**
   * Lerp ring position toward the current mouse coordinates.
   * Schedules itself on every animation frame — runs indefinitely
   * as long as the page is open (matches scroll.js pattern).
   */
  function animateRing() {
    ringX += (mouseX - ringX) * LERP_FACTOR;
    ringY += (mouseY - ringY) * LERP_FACTOR;

    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';

    requestAnimationFrame(animateRing);
  }

  requestAnimationFrame(animateRing);

  // ── 7. Hover state: event delegation on document ───────────────────────────
  // Using pointerover/pointerout (which bubble) with .closest() to check
  // whether the event originated inside an interactive element.
  const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"]';

  document.addEventListener('pointerover', (event) => {
    if (event.target.closest(INTERACTIVE_SELECTOR)) {
      ring.classList.add('cursor-hover');
    }
  });

  document.addEventListener('pointerout', (event) => {
    if (event.target.closest(INTERACTIVE_SELECTOR)) {
      ring.classList.remove('cursor-hover');
    }
  });
}
