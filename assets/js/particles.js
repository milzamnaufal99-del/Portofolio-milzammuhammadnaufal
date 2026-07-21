/**
 * particles.js — Canvas Particle System
 *
 * Renders an animated particle network on a <canvas> element inside the
 * Hero section. Particles move continuously, wrap at canvas edges, and
 * draw connecting lines to any neighbour within a configurable proximity
 * threshold.
 *
 * Performance features:
 *   - Paused via `cancelAnimationFrame` when #hero exits the viewport
 *     (IntersectionObserver, threshold 0) to avoid background rendering.
 *   - Particle positions scale proportionally on window resize so the
 *     visual distribution is preserved across viewport changes.
 *   - Gracefully no-ops if `requestAnimationFrame` is unavailable.
 *
 * Requirements: 5.7, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6
 */

// ── Accent colour ─────────────────────────────────────────────────────────────
// Derived at runtime from the --color-accent CSS custom property so theming
// changes are automatically picked up. Falls back to the design-token default.

/**
 * Reads the --color-accent CSS custom property from :root.
 * @returns {string} hex or rgb colour string
 */
function _getAccentColor() {
  try {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-accent')
      .trim();
    return value || '#2563eb';
  } catch {
    return '#2563eb';
  }
}

// ── Particle Class ────────────────────────────────────────────────────────────

class Particle {
  /**
   * @param {number} canvasWidth
   * @param {number} canvasHeight
   */
  constructor(canvasWidth, canvasHeight) {
    this.x  = Math.random() * canvasWidth;
    this.y  = Math.random() * canvasHeight;
    // Velocity: uniform random in [-0.5, 0.5]
    this.vx = (Math.random() - 0.5);   // gives range [-0.5, 0.5]
    this.vy = (Math.random() - 0.5);
    // Per-particle opacity in [0.3, 0.6]
    this.opacity = 0.3 + Math.random() * 0.3;
  }
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Initialises the canvas particle system in the Hero section.
 *
 * Guards: if `requestAnimationFrame` is not available in `window`, the
 * function returns immediately without setting up any state or listeners.
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object}  [options]
 * @param {number}  [options.maxParticles=80]  Maximum number of particles.
 * @param {number}  [options.proximityPx=120]  Distance threshold (px) for
 *                                              drawing connecting lines.
 */
export function initParticles(canvas, options = {}) {
  // ── Graceful fallback ──────────────────────────────────────────────────────
  if (typeof window === 'undefined' || !window.requestAnimationFrame) return;
  if (!canvas) return;

  // ── Configuration ──────────────────────────────────────────────────────────
  const maxParticles = typeof options.maxParticles === 'number'
    ? Math.min(options.maxParticles, 80)
    : 80;
  const proximityPx  = typeof options.proximityPx  === 'number'
    ? options.proximityPx
    : 120;

  // ── Canvas setup ───────────────────────────────────────────────────────────
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  // ── Particle initialisation ────────────────────────────────────────────────
  /** @type {Particle[]} */
  const particles = [];
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Particle(canvas.width, canvas.height));
  }

  // ── Animation state ────────────────────────────────────────────────────────
  /** ID returned by the most recent requestAnimationFrame call, or null. */
  let animId = null;

  /** Whether the hero section is currently intersecting the viewport. */
  let isVisible = true;

  // ── Animation loop ─────────────────────────────────────────────────────────

  /**
   * Single animation frame: clear → move → wrap → draw particles → draw lines.
   */
  function tick() {
    const w = canvas.width;
    const h = canvas.height;

    // Clear previous frame
    ctx.clearRect(0, 0, w, h);

    const accentColor = _getAccentColor();
    const proxSq = proximityPx * proximityPx;

    // Move, wrap, and draw each particle
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap at edges
      if (p.x < 0)  p.x = w;
      if (p.x > w)  p.x = 0;
      if (p.y < 0)  p.y = h;
      if (p.y > h)  p.y = 0;

      // Draw filled circle
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = _hexToRgba(accentColor, p.opacity);
      ctx.fill();
    }

    // Draw proximity lines between particle pairs
    for (let i = 0; i < particles.length - 1; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a  = particles[i];
        const b  = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < proxSq) {
          // Opacity proportional to proximity: closer → more opaque (max 0.4)
          const ratio       = 1 - Math.sqrt(distSq) / proximityPx;
          const lineOpacity = ratio * 0.4;

          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = _hexToRgba(accentColor, lineOpacity);
          ctx.lineWidth   = 0.8;
          ctx.stroke();
        }
      }
    }

    animId = window.requestAnimationFrame(tick);
  }

  /** Start (or restart) the animation loop. */
  function startLoop() {
    if (animId === null) {
      animId = window.requestAnimationFrame(tick);
    }
  }

  /** Stop the animation loop. */
  function stopLoop() {
    if (animId !== null) {
      window.cancelAnimationFrame(animId);
      animId = null;
    }
  }

  // Kick off the initial loop
  startLoop();

  // ── Resize handling ────────────────────────────────────────────────────────

  window.addEventListener('resize', () => {
    const oldW = canvas.width;
    const oldH = canvas.height;

    const newW = window.innerWidth;
    const newH = window.innerHeight;

    // Update canvas dimensions
    canvas.width  = newW;
    canvas.height = newH;

    // Scale particle positions proportionally so distribution is preserved
    if (oldW > 0 && oldH > 0) {
      const scaleX = newW / oldW;
      const scaleY = newH / oldH;
      for (let i = 0; i < particles.length; i++) {
        particles[i].x *= scaleX;
        particles[i].y *= scaleY;
      }
    }
  });

  // ── IntersectionObserver: pause/resume ─────────────────────────────────────

  if ('IntersectionObserver' in window) {
    const hero = document.getElementById('hero');

    if (hero) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              isVisible = true;
              startLoop();
            } else {
              isVisible = false;
              stopLoop();
            }
          }
        },
        { threshold: 0 }
      );

      heroObserver.observe(hero);
    }
  }

  // Suppress unused-variable lint warning — isVisible is set by the observer
  void isVisible;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Converts a hex colour + alpha into an `rgba(…)` string usable by Canvas 2D.
 * Handles both 3-digit (#rgb) and 6-digit (#rrggbb) hex notation.
 * Falls back to the accent blue if the hex string cannot be parsed.
 *
 * @param {string} hex    e.g. "#3b82f6" or "#3bf"
 * @param {number} alpha  0–1
 * @returns {string}      e.g. "rgba(59,130,246,0.45)"
 */
function _hexToRgba(hex, alpha) {
  // Normalise: strip leading # and expand 3-char shorthand
  let h = (hex || '').replace(/^#/, '');
  if (h.length === 3) {
    h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  }

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);

  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    // Fallback: design-token accent blue
    return `rgba(59,130,246,${alpha})`;
  }

  return `rgba(${r},${g},${b},${alpha})`;
}
