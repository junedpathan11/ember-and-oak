import { Fraunces, Inter } from "next/font/google";

/**
 * Display serif. Optical sizing is enabled via the `opsz` axis so headings
 * render with the high-contrast display cut rather than the text cut.
 */
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

/** Body sans. */
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
