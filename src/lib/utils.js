/** Join class names, skipping falsy values. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/** Shared motion easing (matches --ease-out-soft in globals.css). */
export const easeOut = [0.22, 1, 0.36, 1];

/** Fade-up variant used by section reveals. */
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay },
  }),
};

/** Absolute URL helper for metadata. */
export function absoluteUrl(base, path = "/") {
  return new URL(path, base).toString();
}

/** Very small email check for the contact form. */
export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value).trim());
}
