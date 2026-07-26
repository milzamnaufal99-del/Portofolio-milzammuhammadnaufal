/**
 * @typedef {Object} AchievementEntry
 * @property {string} label       - Display label shown below the counter
 * @property {number} targetValue - Final number the counter animates to
 * @property {string} suffix      - Symbol appended after the number, e.g. "+" | "%" | ""
 * @property {number} duration    - Counter animation duration in milliseconds
 */

/** @type {AchievementEntry[]} */
export const achievements = [
  {
    label: "Projects",
    targetValue: 4,
    suffix: "+",
    duration: 1500,
  },
  {
    label: "Technologies",
    targetValue: 13,
    suffix: "+",
    duration: 1800,
  },
  {
    label: "Learning Hours",
    targetValue: 800,
    suffix: "+",
    duration: 2200,
  },
  {
    label: "GitHub Repositories",
    targetValue: 3,
    suffix: "+",
    duration: 1600,
  },
  {
    label: "Certificates",
    targetValue: 4,
    suffix: "+",
    duration: 1400,
  },
];
