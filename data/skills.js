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
    "Builds semantic and accessible web pages using HTML5 with a strong focus on clean structure and maintainable code.",
    category: "Frontend",
  },
  {
    name: "CSS",
    iconPath: "assets/icons/css.svg",
    description:
   "Creates responsive and modern user interfaces using CSS, Flexbox, Grid, animations, and custom styling techniques.",
    category: "Frontend",
  },
  {
    name: "JavaScript",
    iconPath: "assets/icons/javascript.svg",
    description:
    "Develops interactive web applications using Vanilla JavaScript, DOM manipulation, and ES Modules.",
    category: "Frontend",
  },
  {
    name: "Responsive Design",
    iconPath: "assets/icons/responsive-design.svg",
    description:
    "Builds websites that adapt smoothly across desktop, tablet, and mobile devices with responsive layouts.",
    category: "Frontend",
  },

  // ── Tools & Version Control ──────────────────────────────────────────────────
  {
    name: "Git",
    iconPath: "assets/icons/git.svg",
   description:
  "Uses Git for version control to track changes, manage project history, and collaborate efficiently.",
    category: "Tools & Version Control",
  },
  {
    name: "GitHub",
    iconPath: "assets/icons/github.svg",
    description:
   "Publishes projects on GitHub, manages repositories, and deploys static websites using GitHub Pages.",
    category: "Tools & Version Control",
  },
  {
    name: "REST API",
    iconPath: "assets/icons/rest-api.svg",
    description:
   "Understands the basics of REST APIs and integrates web applications with external services using the Fetch API.",
    category: "Tools & Version Control",
  },

  // ── IoT & Hardware ───────────────────────────────────────────────────────────
  {
    name: "ESP32",
    iconPath: "assets/icons/esp32.svg",
    description:
   "Builds IoT projects with ESP32 using MicroPython and Arduino, integrating sensors, OLED displays, and Wi-Fi connectivity.",
    category: "IoT & Hardware",
  },
  {
    name: "ESP8266",
    iconPath: "assets/icons/esp8266.svg",
    description:
   "Develops IoT systems with ESP8266, including web servers, sensor integration, and real-time monitoring dashboards.",
    category: "IoT & Hardware",
  },
  {
    name: "Arduino",
    iconPath: "assets/icons/arduino.svg",
    description:
   "Creates embedded system projects using Arduino IDE, integrating sensors, actuators, and communication modules.",
    category: "IoT & Hardware",
  },
  {
    name: "MicroPython",
    iconPath: "assets/icons/micropython.svg",
    description:
   "Develops firmware for ESP32 using MicroPython to rapidly prototype IoT applications and sensor-based systems.",
    category: "IoT & Hardware",
  },
  {
    name: "IoT",
    iconPath: "assets/icons/iot.svg",
    description:
   "Designs IoT solutions by connecting hardware devices with web technologies for monitoring and automation.",
    category: "IoT & Hardware",
  },

  // ── AI & Productivity ────────────────────────────────────────────────────────
  {
    name: "AI Prompt Engineering",
    iconPath: "assets/icons/ai-prompt-engineering.svg",
    description:
    "Uses AI tools to accelerate software development, improve code quality, generate documentation, and solve programming problems more efficiently.",
    category: "AI & Productivity",
  },
];
