import localFont from "next/font/local";

/**
 * Display serif font for headings with optical sizing support.
 */
export const fraunces = localFont({
  src: "./fonts/DejaVuSerif.ttf",
  variable: "--font-fraunces",
  display: "swap",
});

/**
 * Clean body sans font (normal weight loaded; unused italic weight omitted for performance).
 */
export const inter = localFont({
  src: "./fonts/DejaVuSans.ttf",
  variable: "--font-inter",
  display: "swap",
});
