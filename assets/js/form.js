/**
 * form.js — Contact Form Validation
 *
 * Provides client-side validation for the contact form.
 * No backend submission is performed — the form has no `action` attribute,
 * so no network request ever fires. On a valid submit the form is hidden and
 * a success message is shown in its place.
 *
 * Requirements: 12.2, 12.3, 12.4, 20.7
 */

// ── Validation rules ──────────────────────────────────────────────────────────

/** @type {RegExp} Basic email format check — same pattern as the spec. */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the value of a single form field.
 *
 * @param {string} fieldId  — One of 'name' | 'email' | 'subject' | 'message'
 * @param {string} value    — The raw (untrimmed) value from the input
 * @returns {string} Empty string when valid; a human-readable error message otherwise
 */
function validateField(fieldId, value) {
  const trimmed = value.trim();

  switch (fieldId) {
    case 'name':
      if (trimmed.length === 0) return 'Name is required.';
      if (trimmed.length < 2)   return 'Name must be at least 2 characters.';
      return '';

    case 'email':
      if (trimmed.length === 0)        return 'Email address is required.';
      if (!EMAIL_REGEX.test(trimmed))  return 'Please enter a valid email address.';
      return '';

    case 'subject':
      if (trimmed.length === 0) return 'Subject is required.';
      if (trimmed.length < 3)   return 'Subject must be at least 3 characters.';
      return '';

    case 'message':
      if (trimmed.length === 0)  return 'Message is required.';
      if (trimmed.length < 10)   return 'Message must be at least 10 characters.';
      return '';

    default:
      return '';
  }
}

// ── DOM helpers ───────────────────────────────────────────────────────────────

/**
 * Shows an inline error for a field.
 *
 * @param {HTMLElement} input      — The form input/textarea element
 * @param {HTMLElement} errorSpan  — The paired <span id="<fieldId>-error"> element
 * @param {string}      message    — The error text to display
 */
function showError(input, errorSpan, message) {
  errorSpan.textContent = message;
  input.setAttribute('aria-describedby', errorSpan.id);
}

/**
 * Clears the inline error for a field.
 *
 * @param {HTMLElement} input      — The form input/textarea element
 * @param {HTMLElement} errorSpan  — The paired <span id="<fieldId>-error"> element
 */
function clearError(input, errorSpan) {
  errorSpan.textContent = '';
  input.removeAttribute('aria-describedby');
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Attaches client-side validation to the contact form.
 * No backend submission — shows success message on valid submit.
 *
 * @param {HTMLFormElement} form
 */
export function initContactForm(form) {
  // Guard: must receive a real HTMLFormElement
  if (!(form instanceof HTMLFormElement)) {
    console.warn('initContactForm: argument is not an HTMLFormElement.', form);
    return;
  }

  /** IDs of every validated field in the form. */
  const FIELD_IDS = ['name', 'email', 'subject', 'message'];

  /**
   * Build a map of { fieldId → { input, errorSpan } } for quick lookup.
   * Fields missing from the DOM are silently skipped so the module degrades
   * gracefully if the HTML changes.
   *
   * @type {Map<string, { input: HTMLElement, errorSpan: HTMLElement }>}
   */
  const fields = new Map();

  FIELD_IDS.forEach((id) => {
    const input     = form.querySelector(`#${id}`);
    const errorSpan = form.querySelector(`#${id}-error`);

    if (input && errorSpan) {
      fields.set(id, { input, errorSpan });
    }
  });

  // ── Per-field live error clearing ──────────────────────────────────────────

  fields.forEach(({ input, errorSpan }) => {
    input.addEventListener('input', () => {
      clearError(input, errorSpan);
    });
  });

  // ── Submit handler ─────────────────────────────────────────────────────────

  form.addEventListener('submit', (event) => {
    // Always prevent native submission (form has no action, but defensive).
    event.preventDefault();

    let isValid = true;

    // Validate every field and surface errors
    fields.forEach(({ input, errorSpan }, fieldId) => {
      const errorMessage = validateField(fieldId, input.value);

      if (errorMessage) {
        showError(input, errorSpan, errorMessage);
        isValid = false;
      } else {
        clearError(input, errorSpan);
      }
    });

    if (!isValid) {
      // Focus the first invalid field to aid keyboard/screen-reader users
      for (const [, { input, errorSpan }] of fields) {
        if (errorSpan.textContent) {
          input.focus();
          break;
        }
      }
      return;
    }

    // ── Valid submission ───────────────────────────────────────────────────
    // Hide the form and reveal the success message.

    // Use the `hidden` attribute (mirrors how the HTML ships it on .form__success)
    form.hidden = true;

    const successEl = form.closest('.contact__form-col')?.querySelector('.form__success')
      ?? form.parentElement?.querySelector('.form__success');

    if (successEl) {
      successEl.removeAttribute('hidden');
    }
  });
}
