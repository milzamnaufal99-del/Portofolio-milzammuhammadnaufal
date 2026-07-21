# Requirements Document

## Introduction

This document defines the requirements for a production-ready personal portfolio website for Milzam Muhammad Naufal — a software developer passionate about web development, IoT, AI-assisted development, and continuous learning who is pursuing an international career. The website serves as a professional online presence targeting recruiters, HR professionals, software companies, Japanese companies, freelance clients, and international companies. Built with HTML, CSS, and Vanilla JavaScript (no frameworks), the site must be modern, minimalist, premium, elegant, and performant, with a dark theme, subtle glassmorphism, and smooth animations. All sections must be data-driven, modular, and maintainable for at least five years.

---

## Glossary

- **Portfolio_Website**: The complete single-page portfolio web application for Milzam Muhammad Naufal.
- **Navbar**: The top navigation bar that provides links to all sections and reflects the currently active section.
- **Hero_Section**: The first visible section containing the professional introduction, headline, subtitle, CTA buttons, animated background, and typing effect.
- **About_Section**: The section describing Milzam's passion, background, and career aspirations.
- **Skills_Section**: The section displaying animated technical skill cards.
- **Projects_Section**: The section displaying reusable project cards loaded from a data file.
- **Timeline_Section**: The section displaying the learning journey as a vertical timeline.
- **Achievements_Section**: The section displaying animated counters for key metrics.
- **Certificates_Section**: The section displaying reusable certificate cards loaded from a data file.
- **Contact_Section**: The section containing the contact form and social/professional links.
- **Footer**: The bottom section displaying copyright information.
- **Data_Layer**: The set of JSON/JS data files in the `data/` directory that define projects, certificates, skills, experience, and social links.
- **Renderer**: The JavaScript module responsible for reading the Data_Layer and generating DOM elements for a section.
- **Scroll_Progress_Bar**: The thin bar at the top of the viewport that fills as the user scrolls down the page.
- **Scroll_To_Top_Button**: The floating button that appears after the user scrolls down and returns the user to the top of the page when clicked.
- **Loading_Screen**: The full-viewport overlay shown during initial page load until all critical resources are ready.
- **Custom_Cursor**: The custom-styled cursor element displayed on desktop/mouse-pointer devices.
- **Particle_Background**: The lightweight canvas-based animated particle effect rendered in the Hero_Section background.
- **Typing_Effect**: The animated typewriter-style text cycling through professional role descriptions in the Hero_Section.
- **Intersection_Observer**: The browser API used to trigger animations when elements enter the viewport.
- **Glassmorphism**: A design style using frosted-glass-like semi-transparent backgrounds with backdrop blur.
- **CTA**: Call-to-action; interactive buttons prompting user engagement.
- **Open_Graph**: A protocol for controlling how URLs are previewed when shared on social platforms.
- **Semantic_HTML**: HTML that uses structurally meaningful elements (e.g., `<section>`, `<nav>`, `<article>`, `<main>`, `<header>`, `<footer>`) to describe content meaning.
- **WCAG**: Web Content Accessibility Guidelines — the international standard for web accessibility.
- **robots_txt**: A text file instructing search engine crawlers which pages to index.
- **sitemap_xml**: An XML file listing all pages and their metadata for search engine discovery.

---

## Requirements

---

### Requirement 1: Project Structure and Architecture

**User Story:** As a developer, I want a clean, modular file structure with separated concerns, so that the codebase remains maintainable and scalable for at least five years without duplicated logic.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL organize files into the following top-level directories: `assets/css/`, `assets/js/`, `assets/images/`, `assets/icons/`, `components/`, `data/`, and `pages/`.
2. THE Portfolio_Website SHALL contain a single `index.html` entry point that imports all CSS and JavaScript modules.
3. THE Portfolio_Website SHALL separate all CSS into dedicated files per section or component (e.g., `hero.css`, `navbar.css`, `cards.css`) within `assets/css/`.
4. THE Portfolio_Website SHALL separate all JavaScript into dedicated module files per concern (e.g., `renderer.js`, `animations.js`, `cursor.js`, `particles.js`) within `assets/js/`.
5. THE Data_Layer SHALL reside exclusively in the `data/` directory as JavaScript files exporting structured data objects (e.g., `projects.js`, `skills.js`, `certificates.js`, `social-links.js`).
6. THE Portfolio_Website SHALL contain inline code comments on all non-trivial JavaScript functions explaining purpose and parameters.
7. THE Portfolio_Website SHALL contain no duplicated rendering logic; all repeated UI patterns (cards, timeline items, counter blocks) SHALL use shared Renderer functions.

---

### Requirement 2: Data-Driven Content Architecture

**User Story:** As the website owner, I want all dynamic content (projects, certificates, skills, social links) defined in a single data file per content type, so that I can add or update content by editing only that data file without touching HTML or rendering logic.

#### Acceptance Criteria

1. THE Data_Layer SHALL export a `projects` array where each entry contains: `id`, `title`, `description`, `techStack` (array), `category`, `githubUrl`, `liveDemoUrl` (nullable), and `imagePath`.
2. THE Data_Layer SHALL export a `skills` array where each entry contains: `name`, `iconPath`, `description`, and `category`.
3. THE Data_Layer SHALL export a `certificates` array where each entry contains: `title`, `issuer`, `date`, `imagePath`, and `credentialUrl` (nullable).
4. THE Data_Layer SHALL export a `socialLinks` array where each entry contains: `platform`, `url`, `iconPath`, and `label`.
5. THE Data_Layer SHALL export an `achievements` array where each entry contains: `label`, `targetValue`, `suffix` (e.g., "+"), and `duration`.
6. THE Data_Layer SHALL export a `timelineEvents` array where each entry contains: `year`, `title`, and `description`.
7. WHEN the `projects` array in the Data_Layer is modified, THE Renderer SHALL produce an updated Projects_Section without any changes to `index.html` or rendering JavaScript.
8. WHEN the `certificates` array in the Data_Layer is modified, THE Renderer SHALL produce an updated Certificates_Section without any changes to `index.html` or rendering JavaScript.

---

### Requirement 3: Loading Screen

**User Story:** As a visitor, I want to see a professional loading screen while the page initializes, so that I have a smooth, polished first impression instead of seeing unstyled content.

#### Acceptance Criteria

1. WHEN a visitor opens the Portfolio_Website, THE Loading_Screen SHALL cover the full viewport with a centered logo or name and an animated progress indicator.
2. WHEN all critical DOM elements and stylesheets are loaded, THE Loading_Screen SHALL fade out with a smooth transition of no more than 600ms.
3. WHILE the Loading_Screen is visible, THE Portfolio_Website SHALL prevent scrolling of the underlying page content.
4. IF the page load time exceeds 4 seconds, THEN THE Loading_Screen SHALL dismiss automatically to avoid blocking user access.
5. THE Loading_Screen SHALL use the same dark theme and color palette as the rest of the Portfolio_Website.

---

### Requirement 4: Navigation Bar

**User Story:** As a visitor, I want a fixed navigation bar that highlights the current section and allows quick jumping to any section, so that I can navigate the one-page site efficiently.

#### Acceptance Criteria

1. THE Navbar SHALL be fixed to the top of the viewport and remain visible during all scroll positions.
2. WHEN the user scrolls past a section boundary, THE Navbar SHALL update the active link to reflect the section currently occupying the majority of the viewport.
3. WHEN the user clicks a Navbar link, THE Portfolio_Website SHALL scroll smoothly to the target section using CSS `scroll-behavior: smooth` or equivalent JavaScript animation.
4. WHEN the user scrolls below the Hero_Section, THE Navbar SHALL apply a glassmorphism-styled background blur to distinguish it from the page content.
5. WHEN the viewport width is 768px or less, THE Navbar SHALL collapse into a hamburger menu icon.
6. WHEN the hamburger menu icon is activated, THE Navbar SHALL display a full-width dropdown or slide-in overlay with all section links.
7. WHEN a mobile menu link is clicked, THE Navbar SHALL close the mobile menu before scrolling to the target section.
8. THE Navbar SHALL contain the site owner's name or logo on the left and navigation links on the right for desktop viewports.

---

### Requirement 5: Hero Section

**User Story:** As a recruiter visiting the site, I want to see a strong professional introduction with clear calls to action immediately upon landing, so that I can quickly understand Milzam's profile and take the next step.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the site owner's full name, a professional headline, and a subtitle with the Typing_Effect cycling through at least three professional role descriptions (e.g., "Software Developer", "IoT Engineer", "AI-Assisted Developer").
2. THE Typing_Effect SHALL cycle through role descriptions at a consistent speed, pausing at least 1500ms before deleting and retyping the next role.
3. THE Hero_Section SHALL contain three CTA buttons: "Download CV", "View Projects", and "Contact Me".
4. WHEN the "Download CV" CTA is clicked, THE Portfolio_Website SHALL initiate a file download of the CV document or open it in a new browser tab.
5. WHEN the "View Projects" CTA is clicked, THE Portfolio_Website SHALL scroll smoothly to the Projects_Section.
6. WHEN the "Contact Me" CTA is clicked, THE Portfolio_Website SHALL scroll smoothly to the Contact_Section.
7. THE Hero_Section SHALL render the Particle_Background as a canvas-based animated effect limited to no more than 80 particles to ensure 60fps performance on mid-range devices.
8. THE Hero_Section SHALL apply a smooth fade-in entrance animation to the name, headline, subtitle, and CTA buttons on initial page load using CSS transitions or keyframe animations.
9. THE Hero_Section SHALL display a professional avatar image or illustration with a subtle floating animation.
10. THE Hero_Section SHALL occupy the full viewport height (100vh) on desktop and at least 90vh on mobile.

---

### Requirement 6: About Me Section

**User Story:** As a recruiter, I want to read a concise and compelling personal statement about Milzam's background and ambitions, so that I can quickly assess cultural fit and career trajectory.

#### Acceptance Criteria

1. THE About_Section SHALL display a professional portrait image alongside the personal statement text.
2. THE About_Section SHALL describe Milzam's passion for software development, web development, IoT, continuous learning, and AI-assisted development in at least three sentences of authentic, non-generic content.
3. THE About_Section SHALL explicitly mention Milzam's goal of pursuing an international career, specifically referencing Japanese companies or the Japanese technology sector.
4. THE About_Section SHALL contain a list of professional interest tags or badges (e.g., "Web Development", "IoT", "AI Tools", "Continuous Learning", "International Career").
5. WHEN the About_Section enters the viewport, THE Portfolio_Website SHALL trigger a slide-in animation on the image and a fade-in animation on the text content using the Intersection_Observer.
6. IF a visitor's browser does not support the Intersection_Observer API, THEN THE Portfolio_Website SHALL display all About_Section content in its final static state without any animation failure.

---

### Requirement 7: Technical Skills Section

**User Story:** As a recruiter, I want to see Milzam's technical skills presented clearly with visual indicators, so that I can quickly assess technical competency across web, IoT, and tooling domains.

#### Acceptance Criteria

1. THE Skills_Section SHALL render one card per entry in the `skills` Data_Layer array using a shared Renderer function.
2. EACH skill card SHALL display: the skill icon, skill name, and a brief description.
3. THE Skills_Section SHALL group skill cards by category (e.g., "Frontend", "Tools & Version Control", "IoT & Hardware", "AI & Productivity").
4. WHEN a skill card is hovered on a pointer device, THE Portfolio_Website SHALL apply a hover effect consisting of a vertical lift (translateY) and a glowing border or shadow matching the primary accent color.
5. WHEN skill cards enter the viewport, THE Portfolio_Website SHALL animate each card with a fade-in and staggered delay using the Intersection_Observer, with a delay increment of no more than 100ms between cards.
6. THE Skills_Section SHALL include cards for all of the following skills: HTML, CSS, JavaScript, Git, GitHub, Responsive Design, REST API, ESP32, ESP8266, Arduino, MicroPython, IoT, AI Prompt Engineering.
7. THE Skills_Section SHALL apply glassmorphism styling to each skill card background.

---

### Requirement 8: Featured Projects Section

**User Story:** As a recruiter or freelance client, I want to browse Milzam's projects with clear descriptions and links, so that I can evaluate the quality and range of completed work.

#### Acceptance Criteria

1. THE Projects_Section SHALL render one card per entry in the `projects` Data_Layer array using a shared Renderer function.
2. EACH project card SHALL display: a project image, title, description, tech stack tags, a GitHub link button, and a live demo link button.
3. WHEN a project entry in the Data_Layer has a null `liveDemoUrl`, THE Portfolio_Website SHALL hide or disable the live demo button for that card without rendering a broken link.
4. THE Projects_Section SHALL support category filtering; WHEN a category filter button is clicked, THE Projects_Section SHALL display only cards matching the selected category.
5. WHEN a project card is hovered on a pointer device, THE Portfolio_Website SHALL apply a lift effect and reveal a brief overlay or expanded description area.
6. WHEN project cards enter the viewport, THE Portfolio_Website SHALL animate each card with a fade-up animation using the Intersection_Observer.
7. THE Renderer SHALL render project cards from the `projects` Data_Layer array without any hardcoded project HTML in `index.html`.
8. THE Projects_Section SHALL display a placeholder message when the `projects` array is empty, informing the visitor that projects will be added soon.

---

### Requirement 9: Learning Journey Timeline Section

**User Story:** As a recruiter, I want to see Milzam's learning and growth milestones presented as a visual timeline, so that I can understand the progression and dedication to continuous improvement.

#### Acceptance Criteria

1. THE Timeline_Section SHALL render one timeline item per entry in the `timelineEvents` Data_Layer array using a shared Renderer function.
2. EACH timeline item SHALL display: the year, the event title, and a short description.
3. THE Timeline_Section SHALL render timeline items in chronological order (earliest to latest).
4. THE Timeline_Section SHALL use a vertical center-line layout on desktop with alternating left/right placement of items.
5. THE Timeline_Section SHALL use a single-column left-aligned layout on viewports 768px or less.
6. WHEN each timeline item enters the viewport, THE Portfolio_Website SHALL animate it with a slide-in from the appropriate side (left or right on desktop, left on mobile) using the Intersection_Observer.
7. THE Timeline_Section SHALL include the following events from the `timelineEvents` Data_Layer: "Started Learning Programming", "Built Mini Projects", "Learning AI Development", "Learning Japanese", "Building Portfolio", and "Future Software Engineer".

---

### Requirement 10: Achievements Section

**User Story:** As a visitor, I want to see key metrics about Milzam's experience displayed as animated counters, so that I can quickly gauge the scale of work and dedication.

#### Acceptance Criteria

1. THE Achievements_Section SHALL render one counter block per entry in the `achievements` Data_Layer array using a shared Renderer function.
2. EACH counter block SHALL display: a label and an animated numeric counter.
3. WHEN the Achievements_Section enters the viewport for the first time, THE Portfolio_Website SHALL trigger each counter to animate from 0 to its `targetValue` over its defined `duration` using the Intersection_Observer.
4. THE counter animation SHALL use an easing function (ease-out) so that numbers accelerate initially and decelerate near the target value.
5. THE Achievements_Section SHALL include counter blocks for at minimum: Projects, Technologies, Learning Hours, GitHub Repositories, and Certificates.
6. WHEN the Achievements_Section has already been scrolled past and re-enters the viewport, THE Portfolio_Website SHALL NOT re-trigger the counter animation.

---

### Requirement 11: Certificates Section

**User Story:** As a recruiter, I want to browse Milzam's certificates with clear metadata, so that I can verify credentials and assess formal learning achievements.

#### Acceptance Criteria

1. THE Certificates_Section SHALL render one card per entry in the `certificates` Data_Layer array using a shared Renderer function.
2. EACH certificate card SHALL display: a certificate image or thumbnail, the certificate title, issuing organization, and issue date.
3. WHEN a certificate entry has a non-null `credentialUrl`, EACH certificate card SHALL display a "Verify" or "View Credential" button linking to that URL in a new tab.
4. WHEN certificate cards enter the viewport, THE Portfolio_Website SHALL animate each card with a fade-in and staggered delay using the Intersection_Observer.
5. THE Certificates_Section SHALL display a placeholder message when the `certificates` array is empty, informing the visitor that certificates will be added soon.
6. THE Renderer SHALL render certificate cards from the `certificates` Data_Layer array without any hardcoded certificate HTML in `index.html`.

---

### Requirement 12: Contact Section

**User Story:** As a recruiter or potential client, I want to contact Milzam through an on-page form or direct links, so that I can initiate a conversation without leaving the portfolio.

#### Acceptance Criteria

1. THE Contact_Section SHALL contain a contact form with fields for: full name, email address, subject, and message.
2. WHEN the contact form is submitted with all required fields populated and a valid email address format, THE Portfolio_Website SHALL display a submission success message to the user.
3. IF the contact form is submitted with any required field empty, THEN THE Portfolio_Website SHALL display a descriptive inline validation error for each empty field without submitting the form.
4. IF the contact form is submitted with an invalid email address format, THEN THE Portfolio_Website SHALL display an inline validation error on the email field without submitting the form.
5. THE Contact_Section SHALL display direct contact links for: Email, GitHub, LinkedIn, Instagram, and Location (city/country), sourced from the `socialLinks` Data_Layer array.
6. WHEN a social contact link is clicked, THE Portfolio_Website SHALL open the target URL in a new browser tab, except for the email link which SHALL open the default mail client.
7. THE Contact_Section SHALL display an animated entrance using the Intersection_Observer when it first enters the viewport.

---

### Requirement 13: Footer

**User Story:** As a visitor, I want to see a clean footer with copyright information, so that the page has a proper, professional closing.

#### Acceptance Criteria

1. THE Footer SHALL display the copyright text "© [current year] Milzam Muhammad Naufal. All rights reserved."
2. THE Footer SHALL dynamically insert the current year using JavaScript so that the copyright year does not require manual annual updates.
3. THE Footer SHALL apply the same dark theme as the rest of the Portfolio_Website.
4. THE Footer SHALL contain quick navigation links to all major sections of the Portfolio_Website.

---

### Requirement 14: Scroll Progress Bar

**User Story:** As a visitor, I want to see a progress bar indicating how far I have scrolled, so that I can gauge my position within the long single-page layout.

#### Acceptance Criteria

1. THE Scroll_Progress_Bar SHALL be a thin horizontal bar fixed at the very top of the viewport, rendered above the Navbar.
2. WHEN the user scrolls the page, THE Scroll_Progress_Bar SHALL update its width as a percentage of `(scrollY / (documentHeight - viewportHeight)) * 100`.
3. THE Scroll_Progress_Bar SHALL use the primary accent color of the Portfolio_Website design.
4. THE Scroll_Progress_Bar SHALL animate its width change smoothly without visible jitter using CSS `transition` or `will-change: width`.

---

### Requirement 15: Scroll To Top Button

**User Story:** As a visitor, I want a button to quickly return to the top of the page, so that I do not have to scroll manually after reading through all sections.

#### Acceptance Criteria

1. THE Scroll_To_Top_Button SHALL be a floating button fixed in the bottom-right corner of the viewport.
2. WHEN the user scrolls more than 400px from the top of the page, THE Scroll_To_Top_Button SHALL become visible with a fade-in transition.
3. WHEN the user is within 400px of the top of the page, THE Scroll_To_Top_Button SHALL be hidden with a fade-out transition.
4. WHEN the Scroll_To_Top_Button is clicked, THE Portfolio_Website SHALL scroll smoothly to the top of the page.
5. THE Scroll_To_Top_Button SHALL include an accessible `aria-label` attribute with the value "Scroll to top".

---

### Requirement 16: Custom Cursor

**User Story:** As a desktop visitor, I want to see a subtle custom cursor, so that the premium design experience is consistent across the entire interaction.

#### Acceptance Criteria

1. WHERE the device uses a pointer input (mouse or trackpad), THE Custom_Cursor SHALL replace the default browser cursor with a custom-styled circular element.
2. THE Custom_Cursor SHALL consist of a small solid dot (inner cursor) and a larger ring (outer cursor) that trails the dot position with a smooth lag effect using CSS transitions or requestAnimationFrame interpolation.
3. WHEN the pointer hovers over an interactive element (links, buttons, inputs), THE Custom_Cursor SHALL scale the outer ring up and change its appearance to indicate interactivity.
4. WHERE the device is a touch device (no mouse pointer), THE Custom_Cursor element SHALL be hidden and the default touch cursor behavior SHALL remain unchanged.
5. THE Custom_Cursor SHALL have no negative impact on pointer event propagation; all click and hover events SHALL function normally.

---

### Requirement 17: Particle Background

**User Story:** As a visitor, I want a subtle animated background in the Hero section, so that the page has a dynamic, premium visual impression without distracting from the content.

#### Acceptance Criteria

1. THE Particle_Background SHALL render on an HTML `<canvas>` element positioned absolutely behind all Hero_Section content.
2. THE Particle_Background SHALL render no more than 80 particles simultaneously to maintain 60fps on mid-range devices.
3. THE Particle_Background SHALL draw thin connecting lines between particles that are within a defined proximity threshold (e.g., 120px).
4. THE Particle_Background SHALL use colors derived from the Portfolio_Website's primary accent palette with low opacity (0.3–0.6) to remain subtle.
5. WHEN the browser window is resized, THE Particle_Background canvas SHALL resize to match the new viewport dimensions without restarting the animation.
6. WHEN the Hero_Section is scrolled out of the viewport, THE Particle_Background SHALL pause the animation loop using `requestAnimationFrame` cancellation to conserve CPU resources.

---

### Requirement 18: Dark Theme and Visual Design

**User Story:** As a visitor, I want a consistent, modern dark theme with glassmorphism elements, so that the site conveys a premium, professional aesthetic appropriate for targeting international tech companies.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL use a dark background as the primary background color (e.g., `#0a0a0a` to `#111111` range) across all sections.
2. THE Portfolio_Website SHALL define a single primary accent color (e.g., a blue or cyan tone) used consistently for highlights, borders, CTA buttons, and active states.
3. THE Portfolio_Website SHALL apply glassmorphism styling (semi-transparent background, `backdrop-filter: blur()`, subtle border with low-opacity white or accent color) to the Navbar, skill cards, project cards, certificate cards, and contact form.
4. THE Portfolio_Website SHALL use a maximum of three typeface weights from a single professional sans-serif font family (e.g., "Inter" or "Plus Jakarta Sans") loaded from Google Fonts.
5. THE Portfolio_Website SHALL define all design tokens (colors, spacing, border radii, font sizes, transition durations) as CSS custom properties (`--variable-name`) in a `:root` block within a dedicated `variables.css` file.
6. THE Portfolio_Website SHALL NOT use bright, saturated neon colors, gaming-style gradients, or childish color palettes; all color choices SHALL remain within a professional, muted, dark-theme palette.

---

### Requirement 19: Responsive Design

**User Story:** As a visitor on any device, I want the portfolio to display correctly and be fully usable, so that recruiters and clients on mobile devices have the same quality experience as desktop visitors.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL be fully functional and visually correct at the following viewport widths: 320px (mobile small), 375px (mobile standard), 768px (tablet), 1024px (laptop), and 1440px (desktop).
2. THE Portfolio_Website SHALL use CSS Flexbox and/or CSS Grid for all multi-column layouts; no fixed-pixel column widths SHALL be used for responsive containers.
3. WHEN the viewport width is 768px or less, THE Portfolio_Website SHALL display all multi-column layouts (skills grid, projects grid, certificates grid) as a single-column or two-column layout.
4. THE Portfolio_Website SHALL use CSS `clamp()` or media query–based `font-size` scaling so that headings and body text remain legible at all breakpoints without overflow.
5. THE Portfolio_Website SHALL ensure all tap targets (buttons, links) have a minimum touch target size of 44×44 CSS pixels on mobile viewports per WCAG 2.5.5.

---

### Requirement 20: Accessibility

**User Story:** As a visitor using assistive technology, I want the portfolio to be accessible, so that keyboard users and screen reader users can navigate and consume all content.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL use Semantic_HTML elements for all structural regions: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.
2. THE Portfolio_Website SHALL provide a descriptive `alt` attribute for every `<img>` element; decorative images SHALL use `alt=""`.
3. THE Portfolio_Website SHALL maintain a logical heading hierarchy: one `<h1>` per page, with `<h2>` for section titles and `<h3>` for card titles.
4. THE Portfolio_Website SHALL ensure all interactive elements (links, buttons, form controls) are reachable and operable via keyboard Tab and Enter/Space keys.
5. THE Portfolio_Website SHALL ensure a minimum color contrast ratio of 4.5:1 for normal body text and 3:1 for large text (≥18pt or ≥14pt bold) against their backgrounds, per WCAG 2.1 Level AA.
6. THE Portfolio_Website SHALL include `aria-label` or `aria-labelledby` attributes on all icon-only buttons and navigation landmarks where the visible label is absent.
7. WHEN the contact form is submitted with invalid data, THE Portfolio_Website SHALL associate each error message with its input using `aria-describedby` so that screen readers announce the error when the field receives focus.

---

### Requirement 21: SEO and Metadata

**User Story:** As a job seeker, I want the portfolio to be discoverable by search engines and display rich previews when shared on social media, so that the site reaches recruiters through organic search and social sharing.

#### Acceptance Criteria

1. THE Portfolio_Website `index.html` SHALL include a `<meta name="description">` tag with a concise, keyword-rich description of no more than 160 characters.
2. THE Portfolio_Website `index.html` SHALL include Open_Graph meta tags: `og:title`, `og:description`, `og:image`, `og:url`, and `og:type`.
3. THE Portfolio_Website `index.html` SHALL include Twitter Card meta tags: `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`.
4. THE Portfolio_Website SHALL include a `robots.txt` file in the root directory that allows all crawlers to index all pages.
5. THE Portfolio_Website SHALL include a `sitemap.xml` file in the root directory listing the single page URL with a `<lastmod>` date.
6. THE Portfolio_Website `index.html` SHALL include a `<title>` tag formatted as "Milzam Muhammad Naufal — Software Developer Portfolio".
7. THE Portfolio_Website SHALL include a `<link rel="canonical">` tag pointing to the site's primary URL.

---

### Requirement 22: Performance

**User Story:** As a visitor on a mobile or slower connection, I want the portfolio to load quickly, so that I do not abandon the page before seeing the content.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL apply `loading="lazy"` to all `<img>` elements below the fold (not in the Hero_Section).
2. THE Portfolio_Website SHALL specify explicit `width` and `height` attributes on all `<img>` elements to prevent layout shift (Cumulative Layout Shift score < 0.1).
3. THE Portfolio_Website SHALL load all Google Fonts using the `display=swap` parameter to prevent render-blocking.
4. THE Portfolio_Website CSS files SHALL be organized so that above-the-fold styles (Navbar, Hero) are loaded first in the `<head>` and remaining section styles are loaded without blocking render.
5. THE Portfolio_Website SHALL NOT load any JavaScript blocking the HTML parser; all `<script>` tags SHALL use `defer` or `type="module"` attributes.
6. THE Portfolio_Website JavaScript SHALL avoid polling or `setInterval`-based scroll listeners; all scroll-triggered behavior SHALL use `requestAnimationFrame` throttling or the Intersection_Observer API.

---

### Requirement 23: Content Authenticity

**User Story:** As a recruiter reviewing the portfolio, I want all written content to be genuine and specific to Milzam Muhammad Naufal, so that the portfolio feels authentic and makes a strong personal impression.

#### Acceptance Criteria

1. THE Portfolio_Website SHALL NOT contain any placeholder text such as "Lorem ipsum" in any section visible to the public.
2. THE Portfolio_Website SHALL display Milzam's real contact email address, GitHub profile URL (`https://github.com/milzamnaufal99-del`), LinkedIn URL (placeholder structured for easy real-URL replacement), and Instagram handle.
3. THE Portfolio_Website SHALL describe each timeline event in the Timeline_Section with a genuine, specific sentence reflecting real learning milestones rather than generic filler text.
4. THE Portfolio_Website SHALL describe each technical skill in the Data_Layer with a one-sentence professional description relevant to Milzam's actual technology usage.

---
