# Design Document — Portfolio Website

## Overview

This document describes the technical design for the personal portfolio website of Milzam Muhammad Naufal — a production-ready, single-page application built with HTML, CSS, and Vanilla JavaScript (no frameworks). The site targets recruiters, HR professionals, Japanese technology companies, freelance clients, and international companies. It emphasizes a premium dark theme with glassmorphism, smooth scroll-driven animations, data-driven content, and strong SEO and accessibility compliance.

### Design Goals

- **Zero runtime dependencies** — No npm, no bundler, no framework. A single `index.html` opens in any browser.
- **Data-driven** — All displayed content (projects, skills, certificates, timeline, achievements, social links) is defined in standalone JS data files; adding content never requires touching HTML or rendering logic.
- **Maintainable for 5+ years** — Strict separation of concerns: one CSS file per section, one JS module per concern, one data file per content type.
- **Performance-first** — `defer` scripts, lazy images, `display=swap` fonts, `requestAnimationFrame` throttling, Intersection Observer for all animations, canvas particle system paused off-screen.
- **Accessible** — Semantic HTML, ARIA attributes, 4.5:1 contrast ratio minimum, keyboard navigability, error association via `aria-describedby`.

---

## Architecture

### High-Level System View

```
index.html
├── <head>
│   ├── variables.css          ← design tokens (:root custom properties)
│   ├── reset.css / base.css   ← normalize, base typography
│   ├── navbar.css             ← above-the-fold (loaded first)
│   ├── hero.css               ← above-the-fold (loaded first)
│   └── [remaining .css files] ← loading.css, about.css, skills.css,
│                                 projects.css, timeline.css,
│                                 achievements.css, certificates.css,
│                                 contact.css, footer.css, cursor.css,
│                                 scroll.css, cards.css, animations.css
└── <body>
    ├── #loading-screen
    ├── #cursor-dot / #cursor-ring
    ├── #scroll-progress
    ├── <header> → <nav>
    ├── <main>
    │   ├── #hero    (canvas + content)
    │   ├── #about
    │   ├── #skills
    │   ├── #projects
    │   ├── #timeline
    │   ├── #achievements
    │   ├── #certificates
    │   └── #contact
    ├── <footer>
    ├── #scroll-to-top
    └── <script type="module"> main.js
```

### Module Dependency Graph

```
main.js
├── data/projects.js
├── data/skills.js
├── data/certificates.js
├── data/social-links.js
├── data/achievements.js
├── data/timeline.js
├── assets/js/renderer.js       ← pure rendering (no side effects)
├── assets/js/animations.js     ← Intersection Observer setup
├── assets/js/cursor.js         ← custom cursor (pointer device only)
├── assets/js/particles.js      ← canvas particle system
├── assets/js/navbar.js         ← active link + hamburger
├── assets/js/scroll.js         ← progress bar + scroll-to-top
├── assets/js/typing.js         ← typewriter effect
└── assets/js/form.js           ← contact form validation
```

`main.js` is the single entry point loaded via `<script type="module" defer src="assets/js/main.js">`. It imports all modules, initialises them, and populates the DOM by calling Renderer functions with data from the Data Layer.

### Request Flow on First Load

```
Browser requests index.html
  → Parse <head>: load CSS (no render blocking)
  → Render above-fold: Loading Screen is immediately visible
  → DOMContentLoaded fires
      → main.js executes (deferred)
          → Renderer fills sections with DOM nodes
          → Intersection Observer registers all animated elements
          → Cursor, Particles, Navbar, Scroll, Typing, Form init
      → Loading screen fades out (≤600ms transition)
  → User scrolls: Intersection Observer triggers animations on demand
```

---

## File / Module Architecture

```
/                               ← project root
├── index.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   ├── variables.css       ← all CSS custom properties (:root)
│   │   ├── reset.css           ← box-sizing, margin/padding reset
│   │   ├── base.css            ← global body, typography, scrollbar
│   │   ├── loading.css
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── about.css
│   │   ├── skills.css
│   │   ├── projects.css
│   │   ├── timeline.css
│   │   ├── achievements.css
│   │   ├── certificates.css
│   │   ├── contact.css
│   │   ├── footer.css
│   │   ├── cards.css           ← shared card styles (project, cert, skill)
│   │   ├── cursor.css
│   │   ├── scroll.css          ← progress bar + scroll-to-top button
│   │   └── animations.css      ← keyframe definitions + .animate-* classes
│   ├── js/
│   │   ├── main.js             ← entry point
│   │   ├── renderer.js
│   │   ├── animations.js
│   │   ├── cursor.js
│   │   ├── particles.js
│   │   ├── navbar.js
│   │   ├── scroll.js
│   │   ├── typing.js
│   │   └── form.js
│   ├── images/
│   │   ├── avatar.webp
│   │   ├── og-image.png        ← 1200×630 Open Graph image
│   │   └── projects/           ← per-project screenshots
│   └── icons/                  ← SVG skill icons, social icons
├── data/
│   ├── projects.js
│   ├── skills.js
│   ├── certificates.js
│   ├── social-links.js
│   ├── achievements.js
│   └── timeline.js
├── components/                 ← static HTML partials (future use / reference)
└── pages/                      ← reserved for future multi-page expansion
```

---

## Components and Interfaces

### 1. `renderer.js` — Pure Rendering Module

All render functions take a data array and a target DOM element, build a document fragment, and append it. No fetch calls, no side effects, no global state mutation.

```js
/**
 * Renders all project cards into the target element.
 * @param {ProjectEntry[]} projects
 * @param {HTMLElement} container
 */
export function renderProjects(projects, container) { … }

/**
 * Renders skill cards grouped by category.
 * @param {SkillEntry[]} skills
 * @param {HTMLElement} container
 */
export function renderSkills(skills, container) { … }

/**
 * Renders certificate cards into the target element.
 * @param {CertificateEntry[]} certificates
 * @param {HTMLElement} container
 */
export function renderCertificates(certificates, container) { … }

/**
 * Renders timeline items in chronological order.
 * @param {TimelineEvent[]} events
 * @param {HTMLElement} container
 */
export function renderTimeline(events, container) { … }

/**
 * Renders achievement counter blocks.
 * @param {AchievementEntry[]} achievements
 * @param {HTMLElement} container
 */
export function renderAchievements(achievements, container) { … }

/**
 * Renders social/contact links.
 * @param {SocialLink[]} links
 * @param {HTMLElement} container
 */
export function renderSocialLinks(links, container) { … }
```

**Card DOM pattern (project card example):**

```html
<article class="card project-card" data-category="web">
  <div class="card__image-wrap">
    <img src="…" alt="…" loading="lazy" width="400" height="225">
  </div>
  <div class="card__body">
    <h3 class="card__title">…</h3>
    <p class="card__description">…</p>
    <ul class="card__tags" aria-label="Tech stack">
      <li class="tag">HTML</li>
    </ul>
    <div class="card__actions">
      <a href="…" target="_blank" rel="noopener noreferrer"
         class="btn btn--ghost btn--sm" aria-label="View on GitHub">GitHub</a>
      <!-- liveDemoUrl === null → element omitted entirely -->
      <a href="…" target="_blank" rel="noopener noreferrer"
         class="btn btn--primary btn--sm">Live Demo</a>
    </div>
  </div>
</article>
```

### 2. `animations.js` — Intersection Observer Manager

Registers a single `IntersectionObserver` (threshold 0.15) that watches all elements with `.animate-on-scroll`. When an element intersects, the observer adds `.is-visible` and unobserves that element (fire-once). CSS handles the actual transition via `.animate-on-scroll` → `.is-visible` state change.

```js
/**
 * Initialises the global scroll animation observer.
 * Falls back gracefully: if IntersectionObserver is unavailable,
 * all .animate-on-scroll elements immediately receive .is-visible.
 */
export function initScrollAnimations() { … }

/**
 * Registers a new element for scroll-triggered animation after
 * initial DOM setup (used for dynamically rendered cards).
 * @param {HTMLElement[]} elements
 */
export function observeElements(elements) { … }
```

Staggered card delays are applied via inline `--delay` CSS custom property set by the renderer:

```html
<article class="card animate-on-scroll" style="--delay: 100ms">…</article>
```

```css
.animate-on-scroll { opacity: 0; transform: translateY(24px); transition: opacity 0.5s ease var(--delay, 0ms), transform 0.5s ease var(--delay, 0ms); }
.animate-on-scroll.is-visible { opacity: 1; transform: none; }
```

### 3. `cursor.js` — Custom Cursor

Only activates on devices that match `(pointer: fine)` media query. Uses two DOM elements (`#cursor-dot`, `#cursor-ring`). The ring position is interpolated each frame via `requestAnimationFrame` for a smooth lag effect.

```js
/**
 * Initialises the custom cursor on pointer-capable devices.
 * No-op on touch/coarse-pointer devices.
 */
export function initCursor() { … }
```

Interactive elements (`a`, `button`, `input`, `textarea`, `select`, `[role="button"]`) receive a `cursor-hover` class on `pointerenter`/`pointerleave` via event delegation on `document`.

### 4. `particles.js` — Canvas Particle System

```js
/**
 * Initialises the canvas particle system in the Hero section.
 * @param {HTMLCanvasElement} canvas
 * @param {Object} options
 * @param {number} options.maxParticles  default 80
 * @param {number} options.proximityPx   default 120
 */
export function initParticles(canvas, options = {}) { … }
```

**Particle lifecycle:**
1. On init: create ≤80 `Particle` objects with random position, velocity (`vx`, `vy` ∈ [-0.5, 0.5]), and opacity.
2. Each `requestAnimationFrame` tick: move particles, wrap at canvas edges, draw circles + lines between particles within `proximityPx`.
3. On resize: update `canvas.width`/`canvas.height` without clearing particles (positions scale proportionally).
4. Pause/resume: an `IntersectionObserver` on `#hero` calls `cancelAnimationFrame` when the hero exits the viewport and `requestAnimationFrame` when it re-enters.

### 5. `navbar.js` — Navigation Bar

```js
/**
 * Initialises navbar scroll behaviour and mobile menu toggle.
 */
export function initNavbar() { … }
```

- **Active link**: One `IntersectionObserver` per section (threshold 0.5). The section whose ID currently intersects updates `[data-nav="<id>"]` to `aria-current="page"` and adds `.active` class.
- **Glassmorphism trigger**: A separate observer on `#hero` — when hero exits, `<nav>` receives `.nav--scrolled` class which applies `backdrop-filter: blur(12px)`.
- **Hamburger**: Toggle `aria-expanded` on button + `aria-hidden` on menu. Close on nav link click or `Escape` key.
- **No `scroll` event listeners** — all behaviour is observer-based.

### 6. `scroll.js` — Progress Bar and Scroll-to-Top

```js
/**
 * Initialises the scroll progress bar and scroll-to-top button.
 * Uses requestAnimationFrame throttling, not scroll event directly.
 */
export function initScrollUI() { … }
```

Pattern: a single `scroll` listener sets a `ticking` flag; `requestAnimationFrame` processes updates and resets the flag.

```js
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => { updateProgress(); updateScrollBtn(); ticking = false; });
    ticking = true;
  }
});
```

### 7. `typing.js` — Typewriter Effect

```js
/**
 * Runs a typewriter cycling animation on the target element.
 * @param {HTMLElement} element
 * @param {string[]} phrases
 * @param {Object} options
 * @param {number} options.typeSpeed    ms per character (default 80)
 * @param {number} options.deleteSpeed  ms per character (default 40)
 * @param {number} options.pauseMs      ms to hold completed phrase (default 1500)
 */
export function initTyping(element, phrases, options = {}) { … }
```

Uses `setTimeout`-based recursion (not `setInterval`) to type, pause, and delete characters.

### 8. `form.js` — Contact Form Validation

```js
/**
 * Attaches client-side validation to the contact form.
 * No backend submission — shows success message on valid submit.
 * @param {HTMLFormElement} form
 */
export function initContactForm(form) { … }
```

Validation rules:
- `name`: required, trimmed length ≥ 2
- `email`: required, matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- `subject`: required, trimmed length ≥ 3
- `message`: required, trimmed length ≥ 10

Each field has a paired `<span id="<fieldId>-error" aria-live="polite">` element. On invalid submit: populate error spans + set `aria-describedby="<fieldId>-error"` on the input. On valid submit: hide form, show `.form__success` element.

---

## Data Models

All data files use ES Module `export const` syntax and are imported by `main.js`. No `fetch`, no JSON parse, no async loading required — data is available synchronously at module evaluation time.

### `data/projects.js`

```js
/**
 * @typedef {Object} ProjectEntry
 * @property {string}      id
 * @property {string}      title
 * @property {string}      description
 * @property {string[]}    techStack
 * @property {string}      category        e.g. "web" | "iot" | "tool"
 * @property {string}      githubUrl
 * @property {string|null} liveDemoUrl
 * @property {string}      imagePath
 */
export const projects = [ … ];
```

### `data/skills.js`

```js
/**
 * @typedef {Object} SkillEntry
 * @property {string} name
 * @property {string} iconPath
 * @property {string} description
 * @property {string} category   e.g. "Frontend" | "Tools & Version Control" | "IoT & Hardware" | "AI & Productivity"
 */
export const skills = [ … ];
```

Required entries: HTML, CSS, JavaScript, Git, GitHub, Responsive Design, REST API, ESP32, ESP8266, Arduino, MicroPython, IoT, AI Prompt Engineering.

### `data/certificates.js`

```js
/**
 * @typedef {Object} CertificateEntry
 * @property {string}      title
 * @property {string}      issuer
 * @property {string}      date          ISO 8601 date string e.g. "2024-03"
 * @property {string}      imagePath
 * @property {string|null} credentialUrl
 */
export const certificates = [ … ];
```

### `data/social-links.js`

```js
/**
 * @typedef {Object} SocialLink
 * @property {string} platform   e.g. "GitHub" | "LinkedIn" | "Email"
 * @property {string} url
 * @property {string} iconPath
 * @property {string} label      accessible label for icon-only usage
 */
export const socialLinks = [ … ];
```

Required entries: Email (`mailto:`), GitHub (`https://github.com/milzamnaufal99-del`), LinkedIn, Instagram, Location (non-link, city/country indicator).

### `data/achievements.js`

```js
/**
 * @typedef {Object} AchievementEntry
 * @property {string} label
 * @property {number} targetValue
 * @property {string} suffix       e.g. "+" | "%" | ""
 * @property {number} duration     animation duration in ms
 */
export const achievements = [ … ];
```

Required entries: Projects, Technologies, Learning Hours, GitHub Repositories, Certificates.

### `data/timeline.js`

```js
/**
 * @typedef {Object} TimelineEvent
 * @property {string} year
 * @property {string} title
 * @property {string} description
 */
export const timelineEvents = [ … ];
```

Required entries (chronological): "Started Learning Programming", "Built Mini Projects", "Learning AI Development", "Learning Japanese", "Building Portfolio", "Future Software Engineer".

### CSS Design Tokens — `variables.css`

```css
:root {
  /* Colors */
  --color-bg-primary:    #0d0d0d;
  --color-bg-secondary:  #111318;
  --color-bg-card:       rgba(255, 255, 255, 0.04);
  --color-accent:        #3b82f6;   /* blue-500 */
  --color-accent-glow:   rgba(59, 130, 246, 0.35);
  --color-text-primary:  #f1f5f9;
  --color-text-secondary:#94a3b8;
  --color-border:        rgba(255, 255, 255, 0.08);

  /* Typography */
  --font-family:         'Inter', sans-serif;
  --font-size-xs:        clamp(0.75rem,  1.5vw, 0.875rem);
  --font-size-sm:        clamp(0.875rem, 2vw,   1rem);
  --font-size-base:      clamp(1rem,     2vw,   1.125rem);
  --font-size-lg:        clamp(1.125rem, 2.5vw, 1.5rem);
  --font-size-xl:        clamp(1.5rem,   4vw,   2.25rem);
  --font-size-2xl:       clamp(2rem,     5vw,   3.5rem);

  /* Spacing */
  --space-xs:   0.25rem;
  --space-sm:   0.5rem;
  --space-md:   1rem;
  --space-lg:   2rem;
  --space-xl:   4rem;
  --space-2xl:  8rem;

  /* Borders & Radii */
  --radius-sm:  4px;
  --radius-md:  8px;
  --radius-lg:  16px;
  --radius-full:9999px;
  --border-glass: 1px solid rgba(255, 255, 255, 0.08);

  /* Glassmorphism */
  --glass-bg:   rgba(255, 255, 255, 0.04);
  --glass-blur: blur(12px);

  /* Transitions */
  --transition-fast:   0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow:   0.5s ease;

  /* Z-index scale */
  --z-base:       1;
  --z-card:       10;
  --z-navbar:     100;
  --z-loading:    200;
  --z-cursor:     300;
}
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property 1: Renderer Cardinality

*For any* array of N data entries passed to a Renderer function (renderProjects, renderSkills, renderCertificates, renderAchievements, renderTimeline), the resulting container DOM should contain exactly N rendered item elements — no more, no fewer.

**Validates: Requirements 2.7, 2.8, 7.1, 8.1, 9.1, 10.1, 11.1**

### Property 2: Renderer Completeness

*For any* data entry passed to a Renderer function, the rendered card or item element should contain all required display fields from that entry (e.g., a project card must contain the project's title, description, tech stack tags, and GitHub link; a certificate card must contain its title, issuer, and date).

**Validates: Requirements 2.1–2.6, 7.2, 8.2, 9.2, 11.2**

### Property 3: Link Nullability Integrity

*For any* project entry where `liveDemoUrl` is `null`, the rendered project card should contain no live-demo link element. *For any* certificate entry where `credentialUrl` is non-null, the rendered certificate card should contain a verify link pointing exactly to that `credentialUrl`.

**Validates: Requirements 8.3, 11.3**

### Property 4: Category Filter Integrity

*For any* selected category filter value and any projects array, after the filter is applied, every visible project card's `data-category` attribute should equal the selected category (no card from a different category should remain visible).

**Validates: Requirements 8.4**

### Property 5: Timeline Chronological Order

*For any* unsorted array of timeline events with distinct year values, the Renderer should output timeline items in strictly ascending year order, regardless of the original array ordering.

**Validates: Requirements 9.3**

### Property 6: Particle Count Invariant

*For any* canvas size passed to `initParticles`, the internal particle array length should never exceed 80, both at initialization and at every subsequent animation frame.

**Validates: Requirements 5.7, 17.2**

### Property 7: Achievement Counter Fires At Most Once

*For any* achievement counter block, once its count animation has completed, a subsequent IntersectionObserver trigger should not restart the animation (the counter value should remain at `targetValue` and not reset to 0).

**Validates: Requirements 10.6**

### Property 8: Form Validation Rejects Invalid Inputs

*For any* form submission where at least one required field is empty, or the email field contains a string that does not match a valid email format, the form should not proceed to the success state; instead, each invalid field should receive an inline error message, and that field's `aria-describedby` attribute should reference the corresponding error element's `id`.

**Validates: Requirements 12.3, 12.4, 20.7**

### Property 9: Scroll Progress Accuracy

*For any* scroll position value `scrollY` within the valid range `[0, documentHeight - viewportHeight]`, the scroll progress bar's rendered width percentage should equal `(scrollY / (documentHeight - viewportHeight)) * 100`, within a rounding tolerance of 1%.

**Validates: Requirements 14.2**

### Property 10: Scroll-to-Top Button Visibility

*For any* scroll position `scrollY`, the scroll-to-top button should be visible (opacity > 0, not `display:none`) if and only if `scrollY > 400`; it should be hidden otherwise.

**Validates: Requirements 15.2, 15.3**

### Property 11: Image Alt Invariant

*For any* data entry rendered by any Renderer function, every `<img>` element produced in the resulting DOM should have an `alt` attribute present (non-missing). Decorative images may use `alt=""` but the attribute must not be absent.

**Validates: Requirements 20.2**

### Property 12: Particle Line Drawing

*For any* two particles in the particle system whose Euclidean distance is less than the configured proximity threshold (default 120px), the canvas render loop should draw a connecting line between them during that animation frame.

**Validates: Requirements 17.3**

---

## Error Handling

### JavaScript Errors

| Scenario | Handling Strategy |
|---|---|
| `IntersectionObserver` not supported | `animations.js` checks `'IntersectionObserver' in window`; if absent, immediately adds `.is-visible` to all `.animate-on-scroll` elements. All content visible in final state. |
| `(pointer: fine)` media query unavailable | `cursor.js` wraps `window.matchMedia` call in try/catch; no cursor elements rendered if unavailable. |
| Empty `projects` array | `renderProjects` detects length 0 and inserts a `<p class="empty-state">` placeholder message. |
| Empty `certificates` array | Same pattern as projects. |
| Missing image file | All `<img>` elements include an `onerror` handler or CSS `background-color` fallback so broken images don't leave blank white boxes. |
| `requestAnimationFrame` not available | Particle system and cursor gracefully degrade: particles simply not rendered; cursor reverts to browser default. |
| Form submit without backend | Form `action` attribute is absent; JavaScript intercepts `submit` event via `preventDefault()`. No network error possible. |
| CV file not found | The CV download link uses `download` attribute; if the file is absent the browser will show a 404 — this is acceptable and should be documented in a README note to update the `href` path. |

### CSS/Layout Errors

- All grid and flex containers include `min-width: 0` on children to prevent overflow bugs.
- `backdrop-filter` is wrapped in `@supports (backdrop-filter: blur(1px))` to silently skip on browsers without support (glassmorphism degrades to a semi-transparent solid background).
- Font loading failure: Google Fonts `display=swap` ensures the system sans-serif font is shown immediately; the swap occurs without layout shift.

### Data Errors

- Each Renderer function validates that its `container` parameter is a non-null `HTMLElement` before proceeding; if null, logs a `console.warn` and returns early without throwing.
- Type mismatches in data entries (e.g., `targetValue` is a string instead of number) are caught by coercing values: `Number(entry.targetValue) || 0`.

---

## Testing Strategy

### Overview

This feature uses Vanilla JavaScript with no bundler or test framework pre-installed. The recommended testing approach pairs a lightweight unit/property test framework with the existing module structure.

**Recommended test framework:** [Vitest](https://vitest.dev/) — zero-config, native ESM support, compatible with the `export const` data files and `export function` module pattern used throughout.

### Unit Tests

Unit tests verify specific behaviors with concrete examples and edge cases:

- Loading screen: DOMContentLoaded → opacity transition applied within 600ms; 4s timeout fallback.
- Navbar: hamburger toggle sets `aria-expanded`; `Escape` key closes mobile menu.
- Typing effect: cycles through all phrases; pauses ≥1500ms at each completed phrase.
- Footer: dynamically inserted year matches `new Date().getFullYear()`.
- Scroll-to-top: `aria-label="Scroll to top"` present on the button element.
- Social links: email link uses `mailto:` scheme; all other links use `https:`.
- Empty state: `renderProjects([])` returns a container with `.empty-state` element.
- Empty state: `renderCertificates([])` returns a container with `.empty-state` element.

### Property-Based Tests

Property-based testing validates the universal correctness properties defined above across many randomly generated inputs.

**Library:** [fast-check](https://fast-check.io/) — compatible with Vitest, pure JavaScript, no build step required.

**Configuration:** Each property test runs a minimum of **100 iterations** (`numRuns: 100`).

**Tag format:** Each test is tagged with a comment in the format:
`// Feature: portfolio-website, Property N: <property_text>`

| Property | Module Under Test | Generator Strategy |
|---|---|---|
| P1: Renderer Cardinality | `renderer.js` | `fc.array(fc.record({id: fc.string(), title: fc.string(), …}), {minLength: 0, maxLength: 50})` |
| P2: Renderer Completeness | `renderer.js` | Single valid record arbitrary per renderer; assert HTML contains field values |
| P3: Link Nullability | `renderer.js` | `fc.option(fc.webUrl())` for liveDemoUrl/credentialUrl |
| P4: Category Filter | `navbar.js` / filter logic | `fc.array(project arb)` + `fc.constantFrom('web','iot','tool')` |
| P5: Timeline Order | `renderer.js` | `fc.array(fc.record({year: fc.integer({min:2000,max:2100}), …}))` shuffled |
| P6: Particle Count | `particles.js` | `fc.record({width: fc.integer({min:320,max:3840}), height: fc.integer({min:568,max:2160})})` |
| P7: Counter Fires Once | `animations.js` counter logic | Simulate intersection twice; assert counter value unchanged after second trigger |
| P8: Form Validation | `form.js` | `fc.record({name: fc.constant(''), email: fc.string(), …})` for empty fields; `fc.string()` filtered to not match email regex for invalid email |
| P9: Scroll Progress | `scroll.js` | `fc.integer({min:0})` for scrollY, docH, viewportH with constraint scrollY ≤ docH - viewportH |
| P10: Scroll Button Visibility | `scroll.js` | `fc.integer({min:0, max:5000})` for scrollY |
| P11: Image Alt Invariant | `renderer.js` | All renderer arbitraries; assert `querySelectorAll('img')` → all have `alt` |
| P12: Particle Line Drawing | `particles.js` | Two particles with known positions within threshold |

### Integration Tests

Verify the assembled page behaviors that cross module boundaries:

- Full page render: `main.js` populates all sections with data from real data files; no empty sections.
- Active nav link updates when section IntersectionObserver fires.
- Hero off-screen → particle `requestAnimationFrame` loop is cancelled.

### Accessibility Spot-Checks (Manual)

Full WCAG validation requires manual testing with assistive technologies. Automated checks to run with [axe-core](https://github.com/dequelabs/axe-core):

- Color contrast ratios ≥ 4.5:1 for all body text.
- All interactive elements reachable by Tab key.
- Heading hierarchy: single `<h1>`, `<h2>` for sections, `<h3>` for cards.
- `aria-label` present on all icon-only buttons.

### SEO / Structure Checks (Smoke)

- `robots.txt` exists and contains `Allow: /`.
- `sitemap.xml` exists and contains the site URL.
- `index.html` contains all required `<meta>` tags (description, og:*, twitter:*).
- `<title>` matches the specified format.
- `<link rel="canonical">` present.

### Performance Checks (Smoke)

- All `<script>` tags have `defer` or `type="module"`.
- All below-fold `<img>` elements have `loading="lazy"`.
- Google Fonts URL contains `display=swap`.
- No `setInterval` usage in any JS module (grep check).
