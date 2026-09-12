/**
 * Brand token values for contexts that cannot read CSS variables — currently
 * only the theme-color meta tag emitted from the root layout.
 *
 * These MUST mirror the custom properties declared in /app/globals.css, which
 * remains the source of truth for everything rendered in the DOM.
 */
export const tokens = {
  bg: "#FAF7F2",
  ink: "#1C1917",
} as const;
