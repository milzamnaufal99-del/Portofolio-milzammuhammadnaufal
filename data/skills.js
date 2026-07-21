/**
 * @typedef {Object} SkillEntry
 * @property {string} name        - Display name of the skill
 * @property {string} iconPath    - Relative path to the skill's SVG icon
 * @property {string} description - Short professional description of the skill
 * @property {string} category    - "Frontend" | "Tools & Version Control" | "IoT & Hardware" | "AI & Productivity"
 */

/** @type {SkillEntry[]} */
export const skills = [
  // ── Frontend ────────────────────────────────────────────────────────────────
  {
    name: "HTML",
    iconPath: "assets/icons/html.svg",
    description:
      "Builds well-structured, semantic web documents using the full range of HTML5 elements — ensuring accessible markup, correct heading hierarchies, and meaningful ARIA roles that assistive technologies can interpret accurately.",
    category: "Frontend",
  },
  {
    name: "CSS",
    iconPath: "assets/icons/css.svg",
    description:
      "Crafts polished, maintainable stylesheets leveraging Flexbox, CSS Grid, custom properties, and keyframe animations — from glassmorphism card effects to responsive typography scaled with clamp().",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    iconPath: "assets/icons/javascript.svg",
    description:
      "Writes clean, modular Vanilla JavaScript (ES Modules) to build interactive UIs, manage DOM state, implement Intersection Observer–driven animations, and validate forms — without relying on any framework.",
    category: "Frontend",
  },
  {
    name: "Responsive Design",
    iconPath: "assets/icons/responsive-design.svg",
    description:
      "Designs layouts that adapt fluidly from 320 px mobile screens to 1440 px desktops using media queries, fluid grids, and fluid typography — ensuring usability and visual integrity at every breakpoint.",
    category: "Frontend",
  },

  // ── Tools & Version Control ──────────────────────────────────────────────────
  {
    name: "Git",
    iconPath: "assets/icons/git.svg",
    description:
      "Manages source code history with Git — committing incremental changes, branching for features, resolving merge conflicts, and maintaining a clean, readable commit log that documents project evolution.",
    category: "Tools & Version Control",
  },
  {
    name: "GitHub",
    iconPath: "assets/icons/github.svg",
    description:
      "Hosts and shares projects on GitHub — opening pull requests, writing descriptive READMEs, and using GitHub Actions workflows to automate basic CI checks and deployment pipelines.",
    category: "Tools & Version Control",
  },
  {
    name: "REST API",
    iconPath: "assets/icons/rest-api.svg",
    description:
      "Consumes and tests RESTful HTTP endpoints using the Fetch API and tools like Postman — handling JSON payloads, managing authentication headers, and gracefully surfacing error responses in the UI.",
    category: "Tools & Version Control",
  },

  // ── IoT & Hardware ───────────────────────────────────────────────────────────
  {
    name: "ESP32",
    iconPath: "assets/icons/esp32.svg",
    description:
      "Programs ESP32 dual-core microcontrollers for Wi-Fi–connected IoT projects — reading sensor data, driving actuators, and exposing lightweight HTTP endpoints or MQTT topics for real-time monitoring dashboards.",
    category: "IoT & Hardware",
  },
  {
    name: "ESP8266",
    iconPath: "assets/icons/esp8266.svg",
    description:
      "Deploys resource-efficient firmware on ESP8266 modules to build standalone, battery-friendly IoT nodes that report environmental data over Wi-Fi to cloud dashboards or local web servers.",
    category: "IoT & Hardware",
  },
  {
    name: "Arduino",
    iconPath: "assets/icons/arduino.svg",
    description:
      "Prototypes embedded systems with the Arduino framework — wiring sensors and actuators, writing interrupt-driven sketches in C++, and iterating quickly from breadboard prototype to working device.",
    category: "IoT & Hardware",
  },
  {
    name: "MicroPython",
    iconPath: "assets/icons/micropython.svg",
    description:
      "Runs MicroPython on constrained microcontrollers to write readable, maintainable firmware in Python — benefiting from rapid REPL-based iteration and straightforward library imports on ESP32/ESP8266 targets.",
    category: "IoT & Hardware",
  },
  {
    name: "IoT",
    iconPath: "assets/icons/iot.svg",
    description:
      "Designs end-to-end IoT systems that connect physical sensors and actuators to web interfaces — covering network protocols (MQTT, HTTP), data pipelines, device provisioning, and user-facing dashboards.",
    category: "IoT & Hardware",
  },

  // ── AI & Productivity ────────────────────────────────────────────────────────
  {
    name: "AI Prompt Engineering",
    iconPath: "assets/icons/ai-prompt-engineering.svg",
    description:
      "Writes structured, context-rich prompts that guide large language models to produce accurate code, thorough documentation, and actionable debugging suggestions — dramatically accelerating development workflows without sacrificing output quality.",
    category: "AI & Productivity",
  },
];
