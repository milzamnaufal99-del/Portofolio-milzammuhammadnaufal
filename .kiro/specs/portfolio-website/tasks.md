# Implementation Plan: Portfolio Website

## Overview

Implement a production-ready single-page personal portfolio for Milzam Muhammad Naufal using HTML, CSS, and Vanilla JavaScript (no frameworks, no bundler). The implementation follows a strict bottom-up order: project scaffolding → data layer → CSS infrastructure → JS modules → sections (loading → navbar → hero → about → skills → projects → timeline → achievements → certificates → contact → footer) → extra UI features → SEO → performance → accessibility audit → property-based tests → final polish.

---

## Tasks

- [x] 1. Scaffold project structure and `index.html` skeleton
  - [x] 1.1 Create all top-level directories: `assets/css/`, `assets/js/`, `assets/images/`, `assets/icons/`, `assets/images/projects/`, `data/`, `components/`, `pages/`
    - Match the exact tree defined in the design's File/Module Architecture section
    - _Requirements: 1.1_
  - [x] 1.2 Create `index.html` with full `<head>` skeleton
    - Add `<!DOCTYPE html>`, `lang="en"`, charset, viewport meta
    - Link all CSS files in correct load order: `variables.css`, `reset.css`, `base.css` first; then remaining section CSS files
    - Add `<script type="module" defer src="assets/js/main.js">` before `</body>`
    - Include placeholder `<section>` elements for all eight content sections plus `<header>`, `<main>`, `<footer>`, `#loading-screen`, `#cursor-dot`, `#cursor-ring`, `#scroll-progress`, `#scroll-to-top`
    - _Requirements: 1.2, 1.3, 20.1_
  - [x] 1.3 Create `assets/css/variables.css` with all CSS design tokens
    - Define all `:root` custom properties from the design: colors, typography (`clamp` sizes), spacing scale, border radii, glassmorphism vars, transition durations, z-index scale
    - _Requirements: 18.2, 18.5_

- [ ] 2. Create Data Layer files
  - [x] 2.1 Create `data/projects.js` — export `projects` array
    - Each entry: `id`, `title`, `description`, `techStack[]`, `category`, `githubUrl`, `liveDemoUrl` (nullable), `imagePath`
    - Add at least three real project entries; set `liveDemoUrl: null` for projects without a live demo
    - _Requirements: 2.1, 2.7, 23.1_
  - [x] 2.2 Create `data/skills.js` — export `skills` array
    - Each entry: `name`, `iconPath`, `description`, `category`
    - Must include all 13 required skills: HTML, CSS, JavaScript, Git, GitHub, Responsive Design, REST API, ESP32, ESP8266, Arduino, MicroPython, IoT, AI Prompt Engineering
    - Write one genuine professional description per skill
    - _Requirements: 2.2, 7.6, 23.4_
  - [x] 2.3 Create `data/certificates.js` — export `certificates` array
    - Each entry: `title`, `issuer`, `date` (ISO 8601), `imagePath`, `credentialUrl` (nullable)
    - _Requirements: 2.3, 2.8_
  - [x] 2.4 Create `data/social-links.js` — export `socialLinks` array
    - Required entries: Email (`mailto:`), GitHub (`https://github.com/milzamnaufal99-del`), LinkedIn, Instagram, Location (non-link indicator)
    - _Requirements: 2.4, 12.5, 23.2_
  - [x] 2.5 Create `data/achievements.js` — export `achievements` array
    - Each entry: `label`, `targetValue`, `suffix`, `duration`
    - Must include: Projects, Technologies, Learning Hours, GitHub Repositories, Certificates
    - _Requirements: 2.5, 10.5_
  - [x] 2.6 Create `data/timeline.js` — export `timelineEvents` array
    - Each entry: `year`, `title`, `description`
    - Must include all six required milestones in chronological order with genuine descriptions
    - _Requirements: 2.6, 9.7, 23.3_

- [x] 3. Build core CSS infrastructure
  - [x] 3.1 Create `assets/css/reset.css` and `assets/css/base.css`
    - `reset.css`: box-sizing border-box, zero margin/padding on all elements
    - `base.css`: global `body` styles (background, color, font-family from token vars), custom scrollbar styling, `scroll-behavior: smooth`, `min-width: 0` on flex/grid children
    - _Requirements: 18.1, 18.4, 19.4_
  - [x] 3.2 Create `assets/css/animations.css`
    - Define all keyframe animations: `fadeIn`, `fadeInUp`, `slideInLeft`, `slideInRight`, `float` (avatar), `spin` (loading indicator)
    - Implement `.animate-on-scroll` base state (`opacity: 0; transform: translateY(24px)`) and `.is-visible` state (`opacity: 1; transform: none`) with `transition` using `--delay` CSS custom property for stagger
    - _Requirements: 1.3, 5.8, 6.5, 7.5_
  - [x] 3.3 Create remaining section CSS stubs
    - Create empty (but valid) CSS files for each section so `index.html` links don't 404: `loading.css`, `navbar.css`, `hero.css`, `about.css`, `skills.css`, `projects.css`, `timeline.css`, `achievements.css`, `certificates.css`, `contact.css`, `footer.css`, `cards.css`, `cursor.css`, `scroll.css`
    - _Requirements: 1.3_

- [x] 4. Implement core JS modules: `renderer.js` and `animations.js`
  - [x] 4.1 Create `assets/js/renderer.js` with all six render functions
    - Implement `renderProjects(projects, container)`, `renderSkills(skills, container)`, `renderCertificates(certificates, container)`, `renderTimeline(events, container)`, `renderAchievements(achievements, container)`, `renderSocialLinks(links, container)`
    - Each function validates `container` is a non-null `HTMLElement`; logs `console.warn` and returns early if not
    - Each function builds a `DocumentFragment` and appends in one DOM operation
    - Apply stagger `--delay` inline style on each card (`index * 100ms`)
    - Empty-array guard: `renderProjects([])` and `renderCertificates([])` insert a `<p class="empty-state">` placeholder
    - All `<img>` elements include `alt`, explicit `width`/`height`, and `loading="lazy"` (hero avatar excluded); coerce `Number(entry.targetValue) || 0` for achievements
    - _Requirements: 1.7, 2.7, 2.8, 7.1, 8.1, 8.8, 9.1, 10.1, 11.1, 20.2, 20.3_
  - [x] 4.2 Create `assets/js/animations.js` with scroll animation observer
    - Implement `initScrollAnimations()`: create one `IntersectionObserver` (threshold 0.15) that adds `.is-visible` and unobserves (fire-once)
    - Implement `observeElements(elements)` for registering dynamically rendered cards
    - Graceful fallback: if `IntersectionObserver` is not in `window`, immediately add `.is-visible` to all `.animate-on-scroll` elements
    - _Requirements: 6.5, 6.6, 7.5, 8.6, 9.6, 10.3, 11.4, 12.7_

- [x] 5. Implement Loading Screen
  - [x] 5.1 Write `assets/css/loading.css`
    - Full-viewport fixed overlay with centered logo/name and animated spinner
    - Use design token colors; `z-index: var(--z-loading)`; `overflow: hidden` on `<body>` while visible
    - CSS `transition: opacity 0.6s ease` for fade-out
    - _Requirements: 3.1, 3.3, 3.5_
  - [x] 5.2 Write loading screen JS logic inside `assets/js/main.js` (initial stub)
    - On `DOMContentLoaded`: set loading screen opacity to 0, then `display: none` after 600ms transition
    - 4-second fallback timeout to force-dismiss if load stalls
    - Remove `overflow: hidden` from `<body>` after dismiss
    - _Requirements: 3.2, 3.3, 3.4_

- [x] 6. Implement Navbar
  - [x] 6.1 Write `index.html` Navbar HTML
    - `<header>` → `<nav>` with site name/logo on left, `<ul>` of anchor links on right
    - Each link: `data-nav="<sectionId>"` attribute; hamburger `<button aria-expanded="false" aria-controls="nav-menu">` visible only on mobile
    - _Requirements: 4.1, 4.8, 20.1, 20.6_
  - [x] 6.2 Write `assets/css/navbar.css`
    - Fixed top, full-width, `z-index: var(--z-navbar)`
    - Desktop: flex row layout with links on right
    - Mobile (≤768px): links hidden by default, hamburger visible; `.nav--open` state reveals overlay
    - `.nav--scrolled` state: `backdrop-filter: var(--glass-blur)`, `background: var(--glass-bg)`, `border-bottom: var(--border-glass)`
    - _Requirements: 4.1, 4.4, 4.5, 4.6, 18.3, 19.1, 19.2_
  - [x] 6.3 Create `assets/js/navbar.js` — `initNavbar()` function
    - Active link: one `IntersectionObserver` per section (threshold 0.5) sets `aria-current="page"` and `.active` on `[data-nav="<id>"]`
    - Glassmorphism trigger: observer on `#hero` exit → adds `.nav--scrolled` to `<nav>`
    - Hamburger: toggle `aria-expanded` + `.nav--open`; close on link click or `Escape` key
    - No `scroll` event listeners — all observer-based
    - _Requirements: 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

- [x] 7. Implement Hero Section
  - [x] 7.1 Write `index.html` Hero HTML and `assets/css/hero.css`
    - `<section id="hero">` with `<canvas id="particles-canvas">` absolutely positioned behind content
    - Content layer: avatar `<img>` (floating animation class), `<h1>` name, `<p>` headline, `<span id="typing-text">` for typewriter, three CTA `<a>` / `<button>` elements
    - Minimum height `100vh` desktop, `90vh` mobile
    - Avatar: `loading="eager"`, explicit `width`/`height`, `alt="Milzam Muhammad Naufal portrait"`, floating CSS animation
    - CTA buttons: "Download CV" (`<a download>`), "View Projects" (`<a href="#projects">`), "Contact Me" (`<a href="#contact">`)
    - All hero content wrapped in `.animate-on-scroll` for initial fade-in
    - _Requirements: 5.1, 5.3, 5.4, 5.5, 5.6, 5.8, 5.9, 5.10, 20.2_
  - [x] 7.2 Create `assets/js/typing.js` — `initTyping(element, phrases, options)` function
    - `setTimeout`-based recursion: type character → pause 1500ms at full phrase → delete character → next phrase
    - Default speeds: `typeSpeed: 80ms`, `deleteSpeed: 40ms`, `pauseMs: 1500ms`
    - Cycle through at least three phrases: "Software Developer", "IoT Engineer", "AI-Assisted Developer"
    - _Requirements: 5.1, 5.2_
  - [x] 7.3 Create `assets/js/particles.js` — `initParticles(canvas, options)` function
    - Initialize ≤80 particles with random position and velocity (`vx`, `vy` ∈ [-0.5, 0.5])
    - Each `requestAnimationFrame` tick: move, wrap at edges, draw circles and proximity lines (< 120px threshold) at low opacity (0.3–0.6)
    - On resize: update `canvas.width`/`canvas.height`; scale particle positions proportionally
    - `IntersectionObserver` on `#hero`: `cancelAnimationFrame` when off-screen, resume when on-screen
    - `requestAnimationFrame` not available: gracefully skip rendering
    - _Requirements: 5.7, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6_

- [x] 8. Implement About Me Section
  - [x] 8.1 Write `index.html` About HTML and `assets/css/about.css`
    - `<section id="about">`: two-column flex layout (image left, text right) on desktop; single column on mobile
    - Portrait `<img>` with `alt`, `width`, `height`, `loading="lazy"`; `.animate-on-scroll` slide-in-left class
    - Text block: `<h2>`, at least three-sentence personal statement mentioning passion for software/web/IoT/AI and Japanese career goal; interest tags/badges list
    - Text content: `.animate-on-scroll` fade-in class
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 19.3, 20.2, 20.3, 23.1_

- [x] 9. Implement Skills Section
  - [x] 9.1 Write `index.html` Skills HTML and `assets/css/skills.css`
    - `<section id="skills">`: `<h2>` title; call `renderSkills(skills, container)` from `main.js` at init
    - Group wrapper `<div data-category="...">` per category with a `<h3>` category heading
    - Each card: glassmorphism background (`background: var(--glass-bg); backdrop-filter: var(--glass-blur); border: var(--border-glass)`)
    - `.animate-on-scroll` on each card; stagger delay via `--delay` inline style
    - Hover: `transform: translateY(-4px)`, `box-shadow: 0 0 16px var(--color-accent-glow)` via CSS
    - `@supports (backdrop-filter: blur(1px))` fallback to semi-transparent solid background
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 18.3_

- [x] 10. Implement Projects Section
  - [x] 10.1 Write `index.html` Projects HTML and `assets/css/projects.css`
    - `<section id="projects">`: `<h2>` title; category filter buttons (`All`, `Web`, `IoT`, `Tool`); card grid container
    - Call `renderProjects(projects, container)` from `main.js` at init; pass rendered cards to `observeElements()`
    - Category filter buttons: on click, hide/show cards by matching `data-category`; update `aria-pressed` state on buttons
    - Card hover: lift effect via CSS; glassmorphism card backgrounds from `cards.css`
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 18.3_
  - [x] 10.2 Write `assets/css/cards.css` — shared card styles
    - `.card` base: glassmorphism background, `border-radius: var(--radius-lg)`, border, overflow hidden
    - `.card__image-wrap img`: aspect-ratio preserved, `object-fit: cover`
    - `.card__body`: padding, flex column layout, `gap`
    - `.card__tags`: flex wrap, tag chip styles
    - `.card__actions`: flex row, `gap`; button/link variants `.btn--primary`, `.btn--ghost`, `.btn--sm`
    - _Requirements: 1.7, 8.2, 11.2, 18.3_

- [x] 11. Implement Learning Journey Timeline Section
  - [x] 11.1 Write `index.html` Timeline HTML and `assets/css/timeline.css`
    - `<section id="timeline">`: `<h2>` title; call `renderTimeline(timelineEvents, container)` from `main.js`
    - Desktop: vertical center-line; items alternate left/right; odd items `.timeline-item--left`, even `.timeline-item--right`
    - Mobile (≤768px): single-column left-aligned, center-line on left edge
    - Each item: `.animate-on-scroll` with `slideInLeft` or `slideInRight` modifier class as appropriate
    - Renderer sorts events by `year` ascending before rendering
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 19.3_

- [x] 12. Implement Achievements Section
  - [x] 12.1 Write `index.html` Achievements HTML and `assets/css/achievements.css`
    - `<section id="achievements">`: `<h2>` title; call `renderAchievements(achievements, container)` from `main.js`
    - Each counter block: `<div class="achievement">` with `<span class="achievement__counter" data-target="..." data-duration="...">0</span>`, suffix `<span>`, and `<p>` label
    - `initScrollAnimations()` observer triggers counter animation; use ease-out easing: `value = target * (1 - Math.pow(1 - progress, 3))`
    - Fire-once flag: set `data-animated="true"` after completion; observer checks flag before restarting
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 13. Implement Certificates Section
  - [x] 13.1 Write `index.html` Certificates HTML and `assets/css/certificates.css`
    - `<section id="certificates">`: `<h2>` title; call `renderCertificates(certificates, container)` from `main.js`
    - Each card: thumbnail `<img>` with `loading="lazy"`, title `<h3>`, issuer, date; "Verify" `<a>` button only when `credentialUrl !== null` (opens in new tab with `rel="noopener noreferrer"`)
    - `.animate-on-scroll` with stagger delay; empty-state placeholder paragraph when array is empty
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 20.2_

- [x] 14. Implement Contact Section
  - [x] 14.1 Write `index.html` Contact HTML and `assets/css/contact.css`
    - `<section id="contact">`: `<h2>` title; glassmorphism-styled `<form>` with fields: name, email, subject, message
    - Each input has paired `<span id="<fieldId>-error" aria-live="polite" class="field-error">` for inline errors
    - `.form__success` element hidden by default (shown on valid submit)
    - Social links grid rendered by `renderSocialLinks(socialLinks, container)` from `main.js`
    - `.animate-on-scroll` on entire section
    - _Requirements: 12.1, 12.2, 12.5, 12.7, 18.3, 20.4, 20.7_
  - [x] 14.2 Create `assets/js/form.js` — `initContactForm(form)` function
    - Validation rules: `name` trimmed ≥ 2 chars, `email` matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, `subject` trimmed ≥ 3 chars, `message` trimmed ≥ 10 chars
    - On invalid submit: populate error `<span>` text + set `aria-describedby="<fieldId>-error"` on input; prevent default
    - On valid submit: `preventDefault()`; hide form; show `.form__success`
    - Clear individual field error on input event
    - _Requirements: 12.2, 12.3, 12.4, 20.7_

- [x] 15. Implement Footer
  - [x] 15.1 Write `index.html` Footer HTML and `assets/css/footer.css`
    - `<footer>`: copyright `<p>` with `id="copyright-year"` placeholder; quick nav `<ul>` with links to all major sections
    - JS in `main.js`: `document.getElementById('copyright-year').textContent = new Date().getFullYear()`
    - Dark theme consistent with rest of site
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

- [x] 16. Implement extra UI features: scroll progress bar, scroll-to-top button, custom cursor
  - [x] 16.1 Create `assets/js/scroll.js` — `initScrollUI()` function and write `assets/css/scroll.css`
    - `#scroll-progress`: `position: fixed; top: 0; left: 0; height: 3px; background: var(--color-accent); z-index` above navbar; `transition: width 0.1s; will-change: width`
    - Width formula: `(scrollY / (docHeight - viewportHeight)) * 100 + '%'`
    - `#scroll-to-top`: `position: fixed; bottom: 2rem; right: 2rem`; visible (opacity 1, pointer-events auto) when `scrollY > 400`; hidden otherwise; `aria-label="Scroll to top"`
    - Both updated via `requestAnimationFrame` throttle pattern (single `ticking` flag)
    - Smooth scroll to top on button click
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 15.1, 15.2, 15.3, 15.4, 15.5, 22.6_
  - [x] 16.2 Create `assets/js/cursor.js` — `initCursor()` function and write `assets/css/cursor.css`
    - Guard: `window.matchMedia('(pointer: fine)')` check (wrapped in try/catch); no-op on touch devices
    - `#cursor-dot`: small solid circle, `position: fixed`, `z-index: var(--z-cursor)`, follows pointer exactly
    - `#cursor-ring`: larger ring, lags behind using `requestAnimationFrame` lerp
    - Event delegation on `document` for `pointerenter`/`pointerleave` on `a, button, input, textarea, select, [role="button"]` — toggle `.cursor-hover` scale-up class on ring
    - `pointer-events: none` on both cursor elements; default cursor hidden via `cursor: none` on `body`
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5_

- [x] 17. Wire everything together in `main.js` and run checkpoint
  - [x] 17.1 Complete `assets/js/main.js` — single entry point
    - Import all data files and all JS modules
    - Call `renderProjects`, `renderSkills`, `renderCertificates`, `renderTimeline`, `renderAchievements`, `renderSocialLinks` with correct container elements
    - Pass rendered card `NodeList`s to `observeElements()`
    - Call `initScrollAnimations()`, `initNavbar()`, `initScrollUI()`, `initCursor()`, `initParticles(canvas)`, `initTyping(el, phrases)`, `initContactForm(form)`
    - Set footer year
    - _Requirements: 1.2, 1.4, 1.6_

- [x] 18. Checkpoint — verify all sections render correctly
  - Open `index.html` in a browser, scroll through all sections, confirm data renders, animations fire, navbar active state updates, mobile hamburger works, and no JS console errors appear. Ask the user if any questions arise.

- [x] 19. Add SEO metadata and static files
  - [x] 19.1 Add all required `<meta>` tags to `index.html` `<head>`
    - `<meta name="description">` ≤ 160 chars with keywords
    - Open Graph: `og:title`, `og:description`, `og:image` (1200×630 `og-image.png`), `og:url`, `og:type`
    - Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
    - `<title>Milzam Muhammad Naufal — Software Developer Portfolio</title>`
    - `<link rel="canonical" href="<primary-url>">`
    - _Requirements: 21.1, 21.2, 21.3, 21.6, 21.7_
  - [x] 19.2 Create `robots.txt` and `sitemap.xml` in project root
    - `robots.txt`: `User-agent: *`, `Allow: /`, `Sitemap: <url>/sitemap.xml`
    - `sitemap.xml`: valid XML with single `<url>` block containing `<loc>` and `<lastmod>`
    - _Requirements: 21.4, 21.5_
  - [x] 19.3 Place `assets/images/og-image.png` (1200×630) placeholder
    - Create a placeholder or real OG image; document in README that this must be updated with a real screenshot
    - _Requirements: 21.2, 21.3_

- [x] 20. Apply performance optimizations
  - [x] 20.1 Audit and fix all `<img>` elements for lazy loading and dimensions
    - Apply `loading="lazy"` to all below-fold images (all except hero avatar)
    - Ensure explicit `width` and `height` attributes present on every `<img>` to prevent CLS
    - _Requirements: 22.1, 22.2_
  - [x] 20.2 Verify Google Fonts URL uses `display=swap` and scripts use `defer`/`type="module"`
    - Check `<link>` Google Fonts href contains `&display=swap`
    - Confirm no `<script>` tag is missing `defer` or `type="module"`
    - Grep for `setInterval` in all JS files and replace any found with `requestAnimationFrame` or `setTimeout` equivalents
    - _Requirements: 22.3, 22.5, 22.6_
  - [x] 20.3 Verify CSS load order in `<head>` for above-the-fold priority
    - `variables.css`, `reset.css`, `base.css`, `navbar.css`, `hero.css` are linked first; remaining section CSS files follow
    - _Requirements: 22.4_

- [x] 21. Accessibility audit and fixes
  - [x] 21.1 Verify semantic HTML structure and heading hierarchy
    - Confirm single `<h1>` (hero name), `<h2>` for all section titles, `<h3>` for card titles
    - Confirm `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` are used correctly
    - _Requirements: 20.1, 20.3_
  - [x] 21.2 Audit ARIA attributes on interactive elements
    - All icon-only buttons (hamburger, scroll-to-top, social icon links) have `aria-label`
    - Hamburger button: `aria-expanded`, `aria-controls` present and toggled correctly
    - Nav links: `aria-current="page"` set on active link by `navbar.js`
    - Social links with icon-only display: `aria-label` from data entry's `label` field
    - _Requirements: 20.6, 4.2, 15.5_
  - [x] 21.3 Verify keyboard navigability and touch target sizes
    - Tab through all interactive elements in browser devtools; confirm all reachable and operable
    - Inspect CTA buttons, nav links, filter buttons, form inputs, card action buttons for minimum 44×44 CSS px touch target on mobile
    - _Requirements: 20.4, 19.5_
  - [x] 21.4 Check color contrast ratios
    - Confirm primary text (`#f1f5f9`) on dark background (`#0d0d0d`) meets ≥ 4.5:1 (calculate or use browser devtools)
    - Confirm secondary text (`#94a3b8`) on card backgrounds meets minimum ratios
    - Confirm accent color buttons have sufficient contrast on their backgrounds
    - _Requirements: 20.5_

- [x] 22. Set up Vitest + fast-check and write property-based tests
  - [x] 22.1 Install and configure Vitest and fast-check
    - Run `npm init -y` in project root; install `vitest` and `fast-check` as dev dependencies
    - Add `vitest.config.js` with `environment: 'jsdom'` and `globals: true`
    - Add `"test": "vitest --run"` script to `package.json`
    - _Requirements: 1.4_ (test framework setup)
  - [x] 22.2 Write unit tests in `tests/unit.test.js`
    - Loading screen: DOMContentLoaded triggers opacity transition ≤ 600ms; 4s timeout fallback fires
    - Navbar: hamburger toggle sets `aria-expanded="true"`; Escape key sets it back to `false`
    - Footer: dynamically inserted year equals `new Date().getFullYear()`
    - Scroll-to-top: `aria-label="Scroll to top"` present on button element
    - Social links: email link `href` starts with `mailto:`; all other links start with `https:`
    - Empty state: `renderProjects([])` returns container with `.empty-state` element
    - Empty state: `renderCertificates([])` returns container with `.empty-state` element
    - _Requirements: 3.2, 3.4, 4.5, 4.7, 12.5, 13.2, 15.5, 8.8, 11.5_
  - [ ]* 22.3 Write property test — P1: Renderer Cardinality
    - // Feature: portfolio-website, Property 1: Renderer Cardinality
    - For any N-length array passed to each renderer, rendered container has exactly N item elements
    - Generator: `fc.array(fc.record({id: fc.string(), title: fc.string(), description: fc.string(), techStack: fc.array(fc.string()), category: fc.string(), githubUrl: fc.webUrl(), liveDemoUrl: fc.option(fc.webUrl()), imagePath: fc.string()}), {minLength: 0, maxLength: 50})`
    - Run 100 iterations; assert `container.querySelectorAll('.card').length === N`
    - **Validates: Requirements 2.7, 2.8, 7.1, 8.1, 9.1, 10.1, 11.1**
  - [ ]* 22.4 Write property test — P2: Renderer Completeness
    - // Feature: portfolio-website, Property 2: Renderer Completeness
    - For any single valid entry rendered, the HTML output contains all required display fields
    - Assert project card HTML contains `title`, `description`, at least one tech tag, and a GitHub link; certificate card contains `title`, `issuer`, `date`
    - **Validates: Requirements 2.1–2.6, 7.2, 8.2, 9.2, 11.2**
  - [ ]* 22.5 Write property test — P3: Link Nullability Integrity
    - // Feature: portfolio-website, Property 3: Link Nullability Integrity
    - Generator: `fc.option(fc.webUrl())` for `liveDemoUrl`; assert no live-demo `<a>` exists when null, credential link exists and points to URL when non-null
    - **Validates: Requirements 8.3, 11.3**
  - [ ]* 22.6 Write property test — P4: Category Filter Integrity
    - // Feature: portfolio-website, Property 4: Category Filter Integrity
    - Generator: `fc.array(projectArb)` + `fc.constantFrom('web','iot','tool')`; apply filter logic; assert every visible card's `data-category` matches selected category
    - **Validates: Requirements 8.4**
  - [ ]* 22.7 Write property test — P5: Timeline Chronological Order
    - // Feature: portfolio-website, Property 5: Timeline Chronological Order
    - Generator: `fc.array(fc.record({year: fc.integer({min:2000, max:2100}), title: fc.string(), description: fc.string()}))` shuffled; assert rendered items are in ascending year order
    - **Validates: Requirements 9.3**
  - [ ]* 22.8 Write property test — P6: Particle Count Invariant
    - // Feature: portfolio-website, Property 6: Particle Count Invariant
    - Generator: `fc.record({width: fc.integer({min:320,max:3840}), height: fc.integer({min:568,max:2160})})`
    - Assert internal particle array length ≤ 80 at init and after 10 simulated animation ticks
    - **Validates: Requirements 5.7, 17.2**
  - [ ]* 22.9 Write property test — P7: Achievement Counter Fires At Most Once
    - // Feature: portfolio-website, Property 7: Achievement Counter Fires At Most Once
    - Simulate IntersectionObserver trigger twice on the same counter block; assert counter stays at `targetValue` and does not reset to 0 on second trigger
    - **Validates: Requirements 10.6**
  - [ ]* 22.10 Write property test — P8: Form Validation Rejects Invalid Inputs
    - // Feature: portfolio-website, Property 8: Form Validation Rejects Invalid Inputs
    - Generators: empty string for required fields; `fc.string()` filtered to not match email regex
    - Assert form does not reach success state; assert error `<span>` is non-empty; assert input has `aria-describedby` referencing error element id
    - **Validates: Requirements 12.3, 12.4, 20.7**
  - [ ]* 22.11 Write property test — P9: Scroll Progress Accuracy
    - // Feature: portfolio-website, Property 9: Scroll Progress Accuracy
    - Generator: `fc.integer({min:0})` for scrollY, docH, viewportH with constraint `scrollY <= docH - viewportH`
    - Assert computed width percentage equals `(scrollY / (docH - viewportH)) * 100` within ±1% tolerance
    - **Validates: Requirements 14.2**
  - [ ]* 22.12 Write property test — P10: Scroll-to-Top Button Visibility
    - // Feature: portfolio-website, Property 10: Scroll-to-Top Button Visibility
    - Generator: `fc.integer({min:0, max:5000})` for scrollY
    - Assert button is visible when `scrollY > 400` and hidden when `scrollY <= 400`
    - **Validates: Requirements 15.2, 15.3**
  - [ ]* 22.13 Write property test — P11: Image Alt Invariant
    - // Feature: portfolio-website, Property 11: Image Alt Invariant
    - For all renderer arbitraries, assert every `<img>` in output has `alt` attribute present (may be empty string, must not be absent)
    - **Validates: Requirements 20.2**
  - [ ]* 22.14 Write property test — P12: Particle Line Drawing
    - // Feature: portfolio-website, Property 12: Particle Line Drawing
    - Create two particle objects with known positions `d < 120px`; run one render tick on a mock canvas context; assert `ctx.beginPath` and `ctx.stroke` were called
    - **Validates: Requirements 17.3**

- [x] 23. Final polish and responsive QA
  - [x] 23.1 Responsive QA across all required breakpoints
    - Open in browser devtools and test at 320px, 375px, 768px, 1024px, 1440px
    - Confirm no horizontal overflow, no fixed-pixel column widths, all grids collapse correctly at ≤768px, font sizes scale with `clamp()`, tap targets ≥ 44×44px on mobile
    - Fix any discovered layout issues in relevant CSS files
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_
  - [x] 23.2 Final content authenticity review
    - Replace any placeholder text with real content; confirm no "Lorem ipsum" anywhere
    - Confirm real GitHub URL `https://github.com/milzamnaufal99-del`, real email, LinkedIn/Instagram placeholders are properly structured for easy real-URL replacement
    - _Requirements: 23.1, 23.2_

- [x] 24. Final checkpoint — all tests pass and site is production-ready
  - Run `npm test` and confirm all unit tests and property-based tests pass. Open `index.html` in multiple browsers. Ask the user if any questions arise before considering this spec complete.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP; they cover property-based and unit tests
- All property tests use `numRuns: 100` minimum as specified in the design
- Each property test is tagged with `// Feature: portfolio-website, Property N: <property_text>`
- The `--delay` CSS custom property stagger pattern is defined once in `animations.css` and reused by all animated sections
- The `@supports (backdrop-filter: blur(1px))` fallback must be applied in every glassmorphism block
- The CV download link (`<a href="..." download>`) requires the actual CV file to be placed in `assets/`; document this in README
- OG image (`assets/images/og-image.png`) must be a real 1200×630 screenshot for production deployment
- No `setInterval` should exist anywhere in the JS codebase; use `setTimeout`-recursion for typing and `requestAnimationFrame` for all animation loops

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5", "2.6"] },
    { "id": 2, "tasks": ["3.1", "3.2", "3.3"] },
    { "id": 3, "tasks": ["4.1", "4.2"] },
    { "id": 4, "tasks": ["5.1", "5.2"] },
    { "id": 5, "tasks": ["6.1", "6.2", "6.3"] },
    { "id": 6, "tasks": ["7.1", "7.2", "7.3"] },
    { "id": 7, "tasks": ["8.1", "9.1", "10.1", "10.2"] },
    { "id": 8, "tasks": ["11.1", "12.1", "13.1"] },
    { "id": 9, "tasks": ["14.1", "14.2", "15.1"] },
    { "id": 10, "tasks": ["16.1", "16.2"] },
    { "id": 11, "tasks": ["17.1"] },
    { "id": 12, "tasks": ["19.1", "19.2", "19.3"] },
    { "id": 13, "tasks": ["20.1", "20.2", "20.3"] },
    { "id": 14, "tasks": ["21.1", "21.2", "21.3", "21.4"] },
    { "id": 15, "tasks": ["22.1"] },
    { "id": 16, "tasks": ["22.2"] },
    { "id": 17, "tasks": ["22.3", "22.4", "22.5", "22.6", "22.7", "22.8", "22.9", "22.10", "22.11", "22.12", "22.13", "22.14"] },
    { "id": 18, "tasks": ["23.1", "23.2"] }
  ]
}
```
