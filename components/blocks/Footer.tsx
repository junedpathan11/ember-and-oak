import Link from "next/link";
import site from "@/content/site";

/**
 * Four-column editorial footer with a hairline top border and a bottom
 * copyright row that repeats the demo label.
 */
export default function Footer() {
  const { business, footer, nav } = site;

  return (
    <footer className="border-t bg-bg">
      <div className="mx-auto max-w-shell px-5 py-14 sm:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div>
            <p className="font-display text-[22px] italic leading-none tracking-[-0.02em]">
              {business.name}
            </p>
            <p className="mt-4 max-w-[28ch] text-[15px] leading-relaxed text-muted">
              {business.tagline}
            </p>
            <p className="eyebrow mt-5">Est. {business.established}</p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h2 className="eyebrow mb-4">{footer.navHeading}</h2>
            <ul className="space-y-2.5">
              {nav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-muted transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Hours */}
          <div>
            <h2 className="eyebrow mb-4">{footer.hoursHeading}</h2>
            <ul className="space-y-3">
              {business.hours.map((entry) => (
                <li key={entry.days} className="text-[15px] leading-relaxed">
                  <span className="block">{entry.days}</span>
                  <span className="block text-muted">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Find us */}
          <div>
            <h2 className="eyebrow mb-4">{footer.findUsHeading}</h2>
            <address className="space-y-3 text-[15px] not-italic leading-relaxed text-muted">
              <p className="max-w-[30ch]">{business.address}</p>
              <p>
                <a
                  href={business.phoneHref}
                  className="transition-colors duration-300 hover:text-primary"
                >
                  {business.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${business.email}`}
                  className="transition-colors duration-300 hover:text-primary"
                >
                  {business.email}
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-shell flex-col gap-1 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-[12px] text-muted">
            {footer.copyright} · {business.demoLabel}
          </p>
          <p className="text-[12px] text-muted">
            A fictional restaurant built as a portfolio piece.
          </p>
        </div>
      </div>
    </footer>
  );
}
