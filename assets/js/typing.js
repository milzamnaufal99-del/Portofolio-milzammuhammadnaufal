/**
 * typing.js — Typewriter Cycling Animation
 *
 * Provides a typewriter effect that cycles through an array of phrases on a
 * target DOM element. Characters are typed one at a time, the completed phrase
 * is held for a pause, then characters are deleted one at a time before moving
 * on to the next phrase — looping endlessly.
 *
 * Uses `setTimeout`-based recursion (never `setInterval`) so each step is
 * scheduled only after the previous one completes, giving precise timing
 * control without drift.
 *
 * Requirements: 5.1, 5.2
 */

/**
 * Runs a typewriter cycling animation on the target element.
 *
 * @param {HTMLElement} element   - The DOM element whose `textContent` will be
 *                                  updated to show the animated text.
 * @param {string[]}    phrases   - Ordered list of phrases to cycle through.
 *                                  Must contain at least one entry.
 * @param {Object}      [options] - Optional configuration overrides.
 * @param {number}      [options.typeSpeed=80]    - Milliseconds between each
 *                                                  typed character.
 * @param {number}      [options.deleteSpeed=40]  - Milliseconds between each
 *                                                  deleted character.
 * @param {number}      [options.pauseMs=1500]    - Milliseconds to hold the
 *                                                  fully typed phrase before
 *                                                  starting deletion.
 */
export function initTyping(element, phrases, options = {}) {
  // ── Guards ────────────────────────────────────────────────────────────────

  // Do nothing if the target element is missing or phrases array is empty.
  if (!element || !phrases || phrases.length === 0) return;

  // ── Configuration ─────────────────────────────────────────────────────────

  const typeSpeed   = typeof options.typeSpeed   === 'number' ? options.typeSpeed   : 80;
  const deleteSpeed = typeof options.deleteSpeed === 'number' ? options.deleteSpeed : 40;
  const pauseMs     = typeof options.pauseMs     === 'number' ? options.pauseMs     : 1500;

  // ── State ─────────────────────────────────────────────────────────────────

  /** Index of the phrase currently being animated. */
  let phraseIndex = 0;

  /** Number of characters of the current phrase currently visible. */
  let charIndex = 0;

  // ── Animation Steps ───────────────────────────────────────────────────────

  /**
   * Types the next character of the current phrase, then either schedules
   * another type step or transitions to the pause step once the full phrase
   * is displayed.
   */
  function typeChar() {
    const currentPhrase = phrases[phraseIndex];

    // Advance one character and update the element.
    charIndex += 1;
    element.textContent = currentPhrase.slice(0, charIndex);

    if (charIndex < currentPhrase.length) {
      // More characters remain — schedule next type step.
      setTimeout(typeChar, typeSpeed);
    } else {
      // Full phrase is now visible — pause before deleting.
      setTimeout(deleteChar, pauseMs);
    }
  }

  /**
   * Deletes the last character of the current phrase, then either schedules
   * another delete step or transitions to the next phrase once the element
   * is empty.
   */
  function deleteChar() {
    // Remove one character and update the element.
    charIndex -= 1;
    element.textContent = phrases[phraseIndex].slice(0, charIndex);

    if (charIndex > 0) {
      // Characters remain — schedule next delete step.
      setTimeout(deleteChar, deleteSpeed);
    } else {
      // Element is empty — advance to the next phrase (wraps around).
      phraseIndex = (phraseIndex + 1) % phrases.length;
      // Brief natural pause before starting the next phrase.
      setTimeout(typeChar, typeSpeed);
    }
  }

  // ── Kick Off ──────────────────────────────────────────────────────────────

  // Start typing the first phrase immediately.
  setTimeout(typeChar, typeSpeed);
}
