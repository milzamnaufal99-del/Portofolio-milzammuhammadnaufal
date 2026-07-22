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
    id: "smart-home-monitor",
    title: "Smart Home Monitor",
    description:
      "An IoT dashboard that collects real-time temperature, humidity, and motion data from ESP32 sensors and displays live readings on a web interface. Data is pushed via MQTT and visualised with dynamic charts.",
    techStack: ["ESP32", "MicroPython", "MQTT", "HTML", "CSS", "JavaScript"],
    category: "iot",
    githubUrl: "https://github.com/milzamnaufal99-del/smart-home-monitor",
    liveDemoUrl: null,
    imagePath: "assets/images/projects/smart-home-monitor.webp",
  },
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
    id: "esp8266-weather-station",
    title: "ESP8266 Weather Station",
    description:
      "A standalone weather station powered by an ESP8266 microcontroller and a DHT22 sensor. Readings are served over Wi-Fi through a lightweight local web page and optionally forwarded to a cloud dashboard via HTTP POST.",
    techStack: ["ESP8266", "Arduino", "C++", "HTML", "CSS"],
    category: "iot",
    githubUrl: "https://github.com/milzamnaufal99-del/esp8266-weather-station",
    liveDemoUrl: null,
    imagePath: "assets/images/projects/esp8266-weather-station.webp",
  },
  {
    id: "rest-api-client",
    title: "REST API Explorer",
    description:
      "A browser-based tool for quickly testing and inspecting REST API endpoints. Supports GET, POST, PUT, and DELETE requests with custom headers and JSON body editing. Responses are syntax-highlighted for readability.",
    techStack: ["HTML", "CSS", "JavaScript", "REST API"],
    category: "tool",
    githubUrl: "https://github.com/milzamnaufal99-del/rest-api-explorer",
    liveDemoUrl: null,
    imagePath: "assets/images/projects/rest-api-explorer.webp",
  },
  {
    id: "ai-prompt-toolkit",
    title: "AI Prompt Toolkit",
    description:
      "A curated collection of reusable prompt templates for software development tasks — code review, refactoring suggestions, documentation generation, and bug triage. Organised by category with a simple search interface.",
    techStack: ["HTML", "CSS", "JavaScript", "AI Prompt Engineering"],
    category: "tool",
    githubUrl: "https://github.com/milzamnaufal99-del/ai-prompt-toolkit",
    liveDemoUrl: null,
    imagePath: "assets/images/projects/ai-prompt-toolkit.webp",
  },
  {
    id: "iot-plant-watering",
    title: "Automated Plant Watering System",
    description:
      "A soil-moisture-based automatic watering system built with an ESP32 and a relay module. The device reads soil moisture levels and triggers a water pump when the soil becomes too dry, logging events to a simple web dashboard.",
    techStack: ["ESP32", "MicroPython", "HTML", "CSS", "JavaScript"],
    category: "iot",
    githubUrl: "https://github.com/milzamnaufal99-del/iot-plant-watering",
    liveDemoUrl: null,
    imagePath: "assets/images/projects/iot-plant-watering.webp",
  },
];
