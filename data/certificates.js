/**
 * @typedef {Object} CertificateEntry
 * @property {string}      title         - Certificate / course name
 * @property {string}      issuer        - Issuing organisation or platform
 * @property {string}      date          - ISO 8601 date string e.g. "2024-03"
 * @property {string}      imagePath     - Relative path to the certificate thumbnail image
 * @property {string|null} credentialUrl - Public verification URL, or null if not available
 */

/** @type {CertificateEntry[]} */
export const certificates = [
  {
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "2023-08",
    imagePath: "assets/images/certificates/dicoding-web-dasar.webp",
    credentialUrl: "https://www.dicoding.com/certificates/98XE4W66QPM3",
  },
  {
    title: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    date: "2023-12",
    imagePath: "assets/images/certificates/dicoding-react.webp",
    credentialUrl: "https://www.dicoding.com/certificates/1RXY7OJQDPVM",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2024-02",
    imagePath: "assets/images/certificates/freecodecamp-responsive-web-design.webp",
    credentialUrl:
      "https://www.freecodecamp.org/certification/milzamnaufal/responsive-web-design",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2024-05",
    imagePath: "assets/images/certificates/freecodecamp-js-algorithms.webp",
    credentialUrl:
      "https://www.freecodecamp.org/certification/milzamnaufal/javascript-algorithms-and-data-structures",
  },
  {
    title: "Introduction to the Internet of Things",
    issuer: "Cisco Networking Academy",
    date: "2023-06",
    imagePath: "assets/images/certificates/cisco-iot.webp",
    credentialUrl: null,
  },
  {
    title: "Programming with MicroPython",
    issuer: "OpenEDG Python Institute",
    date: "2023-10",
    imagePath: "assets/images/certificates/openedu-micropython.webp",
    credentialUrl: null,
  },
  {
    title: "Google IT Automation with Python",
    issuer: "Coursera / Google",
    date: "2024-01",
    imagePath: "assets/images/certificates/google-it-automation-python.webp",
    // UPDATE: Set this to your Coursera specialization certificate share URL when available.
    credentialUrl: null,
  },
];
