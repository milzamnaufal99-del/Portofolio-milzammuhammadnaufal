/**
 * renderer.js — Pure Rendering Module
 *
 * All render functions take a data array and a target DOM element,
 * build a DocumentFragment, and append it in one DOM operation.
 * No fetch calls, no side effects, no global state mutation.
 *
 * Requirements: 1.7, 2.7, 2.8, 7.1, 8.1, 8.8, 9.1, 10.1, 11.1, 20.2, 20.3
 */

/**
 * Validates that container is a non-null HTMLElement.
 * Logs a warning and returns false if invalid.
 * @param {*} container
 * @param {string} fnName
 * @returns {boolean}
 */
function isValidContainer(container, fnName) {
  if (!(container instanceof HTMLElement)) {
    console.warn(
      `[renderer.js] ${fnName}: expected a non-null HTMLElement, got`,
      container
    );
    return false;
  }
  return true;
}

// ── renderProjects ────────────────────────────────────────────────────────────

/**
 * Renders all project cards into the target element.
 * Shows an empty-state placeholder when the projects array is empty.
 *
 * @param {import('../../data/projects.js').ProjectEntry[]} projects
 * @param {HTMLElement} container
 */
export function renderProjects(projects, container) {
  if (!isValidContainer(container, 'renderProjects')) return;

  const fragment = document.createDocumentFragment();

  if (!projects || projects.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No projects to display yet. Check back soon!';
    fragment.appendChild(empty);
    container.appendChild(fragment);
    return;
  }

  projects.forEach((project, index) => {
    const article = document.createElement('article');
    article.className = 'card project-card animate-on-scroll';
    article.dataset.category = project.category || '';
    article.style.setProperty('--delay', `${index * 100}ms`);

    // Image wrap
    const imageWrap = document.createElement('div');
    imageWrap.className = 'card__image-wrap';

    const img = document.createElement('img');
    img.src = project.imagePath || '';
    img.alt = project.title ? `Screenshot of ${project.title}` : '';
    img.loading = 'lazy';
    img.width = 400;
    img.height = 225;
    imageWrap.appendChild(img);

    // Card body
    const body = document.createElement('div');
    body.className = 'card__body';

    const title = document.createElement('h3');
    title.className = 'card__title';
    title.textContent = project.title || '';

    const description = document.createElement('p');
    description.className = 'card__description';
    description.textContent = project.description || '';

    // Tech stack tags
    const tagList = document.createElement('ul');
    tagList.className = 'card__tags';
    tagList.setAttribute('aria-label', 'Tech stack');
    (project.techStack || []).forEach((tech) => {
      const li = document.createElement('li');
      li.className = 'tag';
      li.textContent = tech;
      tagList.appendChild(li);
    });

    // Actions
    const actions = document.createElement('div');
    actions.className = 'card__actions';

    const githubLink = document.createElement('a');
    githubLink.href = project.githubUrl || '#';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.className = 'btn btn--ghost btn--sm';
    githubLink.setAttribute('aria-label', `View ${project.title} on GitHub`);
    githubLink.textContent = 'GitHub';
    actions.appendChild(githubLink);

    if (project.liveDemoUrl !== null && project.liveDemoUrl !== undefined) {
      const demoLink = document.createElement('a');
      demoLink.href = project.liveDemoUrl;
      demoLink.target = '_blank';
      demoLink.rel = 'noopener noreferrer';
      demoLink.className = 'btn btn--primary btn--sm';
      demoLink.textContent = 'Live Demo';
      actions.appendChild(demoLink);
    }

    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(tagList);
    body.appendChild(actions);

    article.appendChild(imageWrap);
    article.appendChild(body);
    fragment.appendChild(article);
  });

  container.appendChild(fragment);
}

// ── renderSkills ──────────────────────────────────────────────────────────────

/**
 * Renders skill cards grouped by category into the target element.
 * Each category gets a wrapper <div class="skills-group" data-category="…">
 * with an <h3> heading, followed by a grid of .skill-card elements.
 * Cards receive .animate-on-scroll and a staggered --delay inline style.
 *
 * @param {import('../../data/skills.js').SkillEntry[]} skills
 * @param {HTMLElement} container
 */
export function renderSkills(skills, container) {
  if (!isValidContainer(container, 'renderSkills')) return;

  const fragment = document.createDocumentFragment();

  // Group skills by category while preserving insertion order
  /** @type {Map<string, import('../../data/skills.js').SkillEntry[]>} */
  const categoryMap = new Map();
  (skills || []).forEach((skill) => {
    const cat = skill.category || 'Other';
    if (!categoryMap.has(cat)) categoryMap.set(cat, []);
    categoryMap.get(cat).push(skill);
  });

  // Global card index for cross-category stagger delay
  let globalIndex = 0;

  categoryMap.forEach((categorySkills, categoryName) => {
    // Group wrapper
    const group = document.createElement('div');
    group.className = 'skills-group';
    group.dataset.category = categoryName;

    // Category heading
    const heading = document.createElement('h3');
    heading.className = 'skills-group__heading';
    heading.textContent = categoryName;
    group.appendChild(heading);

    // Cards grid wrapper
    const cardsGrid = document.createElement('div');
    cardsGrid.className = 'skills-group__grid';

    categorySkills.forEach((skill) => {
      const card = document.createElement('div');
      card.className = 'skill-card animate-on-scroll';
      card.dataset.category = skill.category || '';
      card.style.setProperty('--delay', `${globalIndex * 100}ms`);
      globalIndex++;

      // Icon
      const iconWrap = document.createElement('div');
      iconWrap.className = 'skill-card__icon-wrap';

      const img = document.createElement('img');
      img.src = skill.iconPath || '';
      img.alt = `${skill.name || ''} icon`;
      img.loading = 'lazy';
      img.width = 48;
      img.height = 48;
      iconWrap.appendChild(img);

      // Name
      const name = document.createElement('h4');
      name.className = 'skill-card__name';
      name.textContent = skill.name || '';

      // Description
      const description = document.createElement('p');
      description.className = 'skill-card__description';
      description.textContent = skill.description || '';

      card.appendChild(iconWrap);
      card.appendChild(name);
      card.appendChild(description);
      cardsGrid.appendChild(card);
    });

    group.appendChild(cardsGrid);
    fragment.appendChild(group);
  });

  container.appendChild(fragment);
}

// ── renderCertificates ────────────────────────────────────────────────────────

/**
 * Renders certificate cards into the target element.
 * Shows an empty-state placeholder when the certificates array is empty.
 *
 * @param {import('../../data/certificates.js').CertificateEntry[]} certificates
 * @param {HTMLElement} container
 */
export function renderCertificates(certificates, container) {
  if (!isValidContainer(container, 'renderCertificates')) return;

  const fragment = document.createDocumentFragment();

  if (!certificates || certificates.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'No certificates yet — check back soon!';
    fragment.appendChild(empty);
    container.appendChild(fragment);
    return container;
  }

  certificates.forEach((cert, index) => {
    const article = document.createElement('article');
    article.className = 'card certificate-card animate-on-scroll';
    article.style.setProperty('--delay', `${index * 100}ms`);

    // Image wrap
    const imageWrap = document.createElement('div');
    imageWrap.className = 'cert-card__image-wrap';

    const img = document.createElement('img');
    img.src = cert.imagePath || '';
    img.alt = cert.title ? `${cert.title} certificate` : '';
    img.loading = 'lazy';
    img.width = 400;
    img.height = 225;
    imageWrap.appendChild(img);

    // Card body
    const body = document.createElement('div');
    body.className = 'cert-card__body';

    const title = document.createElement('h3');
    title.className = 'cert-card__title';
    title.textContent = cert.title || '';

    const issuer = document.createElement('p');
    issuer.className = 'cert-card__issuer';
    issuer.textContent = cert.issuer || '';

    const date = document.createElement('p');
    date.className = 'cert-card__date';
    // Use a <time> element inside the <p> for semantic date markup
    const time = document.createElement('time');
    time.dateTime = cert.date || '';
    time.textContent = formatCertDate(cert.date || '');
    date.appendChild(time);

    // Actions — only rendered when credentialUrl is non-null
    const actions = document.createElement('div');
    actions.className = 'cert-card__actions';

    if (cert.credentialUrl !== null && cert.credentialUrl !== undefined) {
      const verifyLink = document.createElement('a');
      verifyLink.href = cert.credentialUrl;
      verifyLink.target = '_blank';
      verifyLink.rel = 'noopener noreferrer';
      verifyLink.className = 'btn btn--primary btn--sm';
      verifyLink.setAttribute('aria-label', `Verify ${cert.title} credential`);
      verifyLink.textContent = 'Verify Credential';
      actions.appendChild(verifyLink);
    }

    body.appendChild(title);
    body.appendChild(issuer);
    body.appendChild(date);
    body.appendChild(actions);

    article.appendChild(imageWrap);
    article.appendChild(body);
    fragment.appendChild(article);
  });

  container.appendChild(fragment);
  return container;
}

/**
 * Formats an ISO date string (e.g. "2024-03") to a readable label (e.g. "Mar 2024").
 * @param {string} isoDate
 * @returns {string}
 */
function formatCertDate(isoDate) {
  if (!isoDate) return '';
  const parts = isoDate.split('-');
  if (parts.length < 2) return isoDate;
  const [year, month] = parts;
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const monthIndex = parseInt(month, 10) - 1;
  const monthName = monthNames[monthIndex] || month;
  return `${monthName} ${year}`;
}

// ── renderTimeline ────────────────────────────────────────────────────────────

/**
 * Renders timeline items in chronological (ascending year) order.
 * Alternates .timeline-item--left / .timeline-item--right for odd/even items.
 *
 * @param {import('../../data/timeline.js').TimelineEvent[]} events
 * @param {HTMLElement} container
 */
export function renderTimeline(events, container) {
  if (!isValidContainer(container, 'renderTimeline')) return;

  const fragment = document.createDocumentFragment();

  // Sort ascending by year (string comparison works for 4-digit years)
  const sorted = [...(events || [])].sort((a, b) => {
    return String(a.year).localeCompare(String(b.year), undefined, { numeric: true });
  });

  sorted.forEach((event, index) => {
    const item = document.createElement('div');
    const side = index % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right';
    item.className = `timeline-item ${side} animate-on-scroll`;
    item.style.setProperty('--delay', `${index * 100}ms`);

    const content = document.createElement('div');
    content.className = 'timeline-item__content';

    const year = document.createElement('span');
    year.className = 'timeline-item__year';
    year.textContent = event.year || '';

    const title = document.createElement('h3');
    title.className = 'timeline-item__title';
    title.textContent = event.title || '';

    const description = document.createElement('p');
    description.className = 'timeline-item__description';
    description.textContent = event.description || '';

    content.appendChild(year);
    content.appendChild(title);
    content.appendChild(description);
    item.appendChild(content);
    fragment.appendChild(item);
  });

  container.appendChild(fragment);
}

// ── renderAchievements ────────────────────────────────────────────────────────

/**
 * Renders achievement counter blocks into the target element.
 * Coerces targetValue via Number(entry.targetValue) || 0.
 *
 * @param {import('../../data/achievements.js').AchievementEntry[]} achievements
 * @param {HTMLElement} container
 */
export function renderAchievements(achievements, container) {
  if (!isValidContainer(container, 'renderAchievements')) return;

  const fragment = document.createDocumentFragment();

  (achievements || []).forEach((achievement, index) => {
    const targetValue = Number(achievement.targetValue) || 0;

    const block = document.createElement('div');
    block.className = 'achievement animate-on-scroll';
    block.style.setProperty('--delay', `${index * 100}ms`);

    const counter = document.createElement('span');
    counter.className = 'achievement__counter';
    counter.dataset.target = String(targetValue);
    counter.dataset.duration = String(achievement.duration || 1500);
    counter.textContent = '0';

    const suffix = document.createElement('span');
    suffix.className = 'achievement__suffix';
    suffix.textContent = achievement.suffix || '';

    const label = document.createElement('p');
    label.textContent = achievement.label || '';

    block.appendChild(counter);
    block.appendChild(suffix);
    block.appendChild(label);
    fragment.appendChild(block);
  });

  container.appendChild(fragment);
}

// ── renderSocialLinks ─────────────────────────────────────────────────────────

/**
 * Renders social/contact links into the target element.
 * Entries with an empty url are rendered as non-navigable display items (no <a> wrap).
 *
 * @param {import('../../data/social-links.js').SocialLink[]} links
 * @param {HTMLElement} container
 */
export function renderSocialLinks(links, container) {
  if (!isValidContainer(container, 'renderSocialLinks')) return;

  const fragment = document.createDocumentFragment();

  (links || []).forEach((link, index) => {
    const isNavigable = Boolean(link.url);

    let item;
    if (isNavigable) {
      item = document.createElement('a');
      item.href = link.url;
      // mailto: links should open the mail client in the same context
      if (!link.url.startsWith('mailto:')) {
        item.target = '_blank';
        item.rel = 'noopener noreferrer';
      }
      item.setAttribute('aria-label', link.label || link.platform || '');
      item.className = 'social-link animate-on-scroll';
    } else {
      item = document.createElement('span');
      item.setAttribute('aria-label', link.label || link.platform || '');
      item.className = 'social-link social-link--display animate-on-scroll';
    }

    item.style.setProperty('--delay', `${index * 100}ms`);

    const img = document.createElement('img');
    img.src = link.iconPath || '';
    img.alt = `${link.platform || ''} icon`;
    img.loading = 'lazy';
    img.width = 24;
    img.height = 24;

    const textWrap = document.createElement('div');
textWrap.className = 'social-link__text';

const platformName = document.createElement('span');
platformName.className = 'social-link__platform';
platformName.textContent = link.platform || '';

textWrap.appendChild(platformName);

if (!link.url && link.label) {
  const detail = document.createElement('small');
  detail.className = 'social-link__detail';
  detail.textContent = link.label;
  textWrap.appendChild(detail);
}

item.appendChild(img);
item.appendChild(textWrap);
    fragment.appendChild(item);
  });

  container.appendChild(fragment);
}
