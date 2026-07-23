/**
 * @typedef {Object} ProjectEntry
 * @property {string}      id          - Unique kebab-case identifier
 * @property {string}      title       - Display title of the project
 * @property {string}      description - Short description shown on the card
 * @property {string[]}    techStack   - Technologies / tools used
 * @property {string}      category    - "web" | "iot" | "tool"
 * @property {string}      githubUrl   - Link to the GitHub repository
 * @property {string|null} liveDemoUrl - Link to live demo, or null if not available
 * @property {string}      imagePath   - Relative path to the project screenshot/thumbnail
 */

/** @type {ProjectEntry[]} */
export const projects = [

  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    description:
      "A production-ready single-page portfolio built with pure HTML, CSS, and Vanilla JavaScript. Features a dark glassmorphism theme, scroll-driven animations, data-driven content, canvas particle background, and full accessibility compliance.",
    techStack: ["HTML", "CSS", "JavaScript", "Vitest", "fast-check"],
    category: "web",
    githubUrl: "https://github.com/milzamnaufal99-del/portfolio",
    liveDemoUrl: null,
    imagePath: "assets/images/projects/portfolio-home.webp",
  },
  {
    id: "visitor-counter-iot",
    title: "IOT Visitor Counter System",
    description:
      "An IoT-based visitor counting system built using ESP8266 (Wemos D1 Mini), dual PIR sensors, LCD I2C display, DFPlayer Mini, and a web dashboard. The system automatically counts visitors entering and leaving a room, displays occupancy in real time, and supports future cloud integration for remote monitoring.",
   techStack: [
    "ESP8266",
    "Arduino IDE",
    "C++",
    "HTML",
    "CSS",
    "JavaScript",
    "IoT"
  ],
    category: "iot",
    githubUrl: null,
    liveDemoUrl: null,
    imagePath: "assets/images/projects/visitor-counter.webp",
  },
  {
    id: "budget-tracker",
    title: "Expense Tracking Dashboard",
    description:
    "A responsive web application for recording and visualizing personal expenses. Users can categorize spending, monitor expense summaries, and view financial data through a clean and interactive dashboard.",
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
],
category: "web",
githubUrl: "https://github.com/milzamnaufal99-del/CodingCamp-6July26-milzammuhammadnaufal",
liveDemoUrl: "https://milzamnaufal99-del.github.io/CodingCamp-6July26-milzammuhammadnaufal/",
imagePath: "assets/images/projects/budget-tracker.webp"
}
];
