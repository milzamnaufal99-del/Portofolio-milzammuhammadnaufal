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
  title: "Fiber Optic Installation Training",
  issuer: "Telkom Akses",
  date: "2025",
  imagePath: "assets/images/certificates/telkom-akses.webp",
  credentialUrl: "https://drive.google.com/drive/folders/1q-XkNuIuus-XmTLivzKwmkNuSLJOCJ9O",
},
  {
  title: "Samsung Technician Training",
  issuer: "Samsung",
  date: "2026",
  imagePath: "assets/images/certificates/samsung-technician.webp",
  credentialUrl: "https://drive.google.com/drive/folders/1XLCDi_DSmupZOSqClFjlWCglVB05ip7r",
},
  {
  title: "Software Engineering",
  issuer: "RevoU",
  date: "2026",
  imagePath: "assets/images/certificates/revou-software-engineering.webp",
  credentialUrl: "https://drive.google.com/drive/folders/1y3Vz0KWrhLCyw_uBSTUvBR1HNukPXW7E",
},
  {
  title: "Data Analytics",
  issuer: "RevoU",
  date: "2026",
  imagePath: "assets/images/certificates/revou-data-analytics.webp",
  credentialUrl: "https://drive.google.com/drive/folders/1oDASe1IlP3htaiTNQLTqJWMrtEY93m5P",
},
];
