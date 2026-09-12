"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import site from "@/content/site";

/**
 * Sticky navigation: Fraunces italic wordmark left, uppercase links right,
 * 1px hairline underneath. Below `md` it collapses to a hamburger that opens
 * a full-screen overlay using the same typographic language.
 *
 * The overlay is portalled to `document.body` rather than rendered inside the
 * header. The header carries `backdrop-blur`, and any `backdrop-filter` other
 * than `none` makes an element a containing block for its `position: fixed`
 * descendants (and opens a stacking context). Left inside, the overlay would
 * size itself to the ~65px header strip instead of the viewport, and its
 * `z-50` would be trapped under the header's `z-30`, letting the `z-40`
 * WhatsApp FAB paint over it. The portal escapes both traps.
 *
 * No mount gate is needed around `createPortal`: `open` is `false` on the
 * server and through hydration, and only a click can flip it, so the portal
 * is never evaluated before `document` exists.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [renderedFor, setRenderedFor] = useState(pathname);

  // Close the overlay on navigation. Done during render (not in an effect) so
  // the menu never paints open on the new route.
  if (renderedFor !== pathname) {
    setRenderedFor(pathname);
    if (open) setOpen(false);
  }

  // Lock body scroll and support Escape while the overlay is open.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-30 border-b bg-bg/95 backdrop-blur-[2px]">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-shell items-center justify-between px-5 py-4 sm:px-8 md:py-5"
      >
        <Link
          href="/"
          className="font-display text-[22px] italic leading-none tracking-[-0.02em] transition-colors duration-300 hover:text-primary"
        >
          {site.business.name}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {site.nav.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`label-caps transition-colors duration-300 hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile trigger with 44px min touch target and accessible ARIA attributes */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="-mr-2 flex h-11 w-11 items-center justify-center text-ink md:hidden"
        >
          <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </nav>

      {/* Full-screen overlay menu, portalled out of the blurred header */}
      {open
        ? createPortal(
            <div
              id="mobile-menu"
              className="fixed inset-0 z-50 flex flex-col bg-bg md:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between border-b px-5 py-4">
                <span className="font-display text-[22px] italic leading-none tracking-[-0.02em]">
                  {site.business.name}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  autoFocus
                  className="-mr-2 flex h-11 w-11 items-center justify-center text-ink"
                >
                  <X size={22} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </div>

              <ul className="flex flex-1 flex-col justify-center px-5 pb-24">
                {site.nav.map((link) => (
                  <li key={link.href} className="border-b last:border-b-0">
                    <Link
                      href={link.href}
                      aria-current={isActive(link.href) ? "page" : undefined}
                      className={`label-caps block py-6 ${
                        isActive(link.href) ? "text-primary" : "text-ink"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="border-t px-5 py-6">
                <a
                  href={site.business.phoneHref}
                  className="font-display text-2xl tracking-[-0.02em]"
                >
                  {site.business.phone}
                </a>
                <p className="eyebrow mt-2">{site.business.demoLabel}</p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
