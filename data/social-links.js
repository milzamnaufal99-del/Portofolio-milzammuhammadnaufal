/**
 * @typedef {Object} SocialLink
 * @property {string}      platform  - Display name of the platform, e.g. "GitHub" | "LinkedIn" | "Email"
 * @property {string}      url       - Full URL or mailto: URI; empty string for non-navigable indicators (e.g. Location)
 * @property {string}      iconPath  - Relative path to the platform's SVG icon inside assets/icons/
 * @property {string}      label     - Accessible label used when the link is rendered as an icon-only element
 */

/** @type {SocialLink[]} */
export const socialLinks = [
  // ── Email ────────────────────────────────────────────────────────────────────
  // Opens the visitor's default mail client via the mailto: scheme (req. 12.5 / 12.6).
  {
    platform: "Email",
    url: "mailto:milzamnaufal99@gmail.com",
    iconPath: "assets/icons/email.svg",
    label: "Send an email to Milzam",
  },

  // ── GitHub ───────────────────────────────────────────────────────────────────
  {
    platform: "GitHub",
    url: "https://github.com/milzamnaufal99-del",
    iconPath: "assets/icons/github.svg",
    label: "View Milzam's GitHub profile",
  },

  // ── LinkedIn ─────────────────────────────────────────────────────────────────
  // UPDATE: Replace the slug below with your real LinkedIn public profile slug.
  // e.g. if your profile URL is https://www.linkedin.com/in/john-doe-123 → slug is "john-doe-123"
  {
    platform: "LinkedIn",
    url: "linkedin.com/in/milzam-muhammad-naufal-345a2b418",
    iconPath: "assets/icons/linkedin.svg",
    label: "Connect with Milzam on LinkedIn",
  },

  // ── Instagram ────────────────────────────────────────────────────────────────
  // UPDATE: Replace the username below with your real Instagram username.
  // e.g. if your profile URL is https://www.instagram.com/johndoe → username is "johndoe"
  {
    platform: "Instagram",
    url: "https://www.instagram.com/zammbm8",
    iconPath: "assets/icons/instagram.svg",
    label: "Follow Milzam on Instagram",
  },

  // ── Location ─────────────────────────────────────────────────────────────────
  // Non-navigable indicator (req. 23.2 / design spec).
  // url is an empty string — the renderer should treat this entry as display-only
  // and NOT wrap it in an <a> element.
  {
  platform: "Location",
  url: "",
  iconPath: "assets/icons/location.svg",
  label: "Cimahi, West Java, Indonesia",
},
];
