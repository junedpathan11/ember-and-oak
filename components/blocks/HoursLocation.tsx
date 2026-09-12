import Button from "@/components/ui/Button";
import FadeUp from "@/components/ui/FadeUp";
import site from "@/content/site";

/**
 * Two-column visit block: hours and contact actions on the left, a grayscale
 * Google Maps embed on the right.
 */
export default function HoursLocation() {
  const { business } = site;
  const { hoursLocation } = site.home;

  return (
    <section className="border-t bg-surface">
      <div className="mx-auto max-w-shell px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <FadeUp className="md:col-span-5">
            <p className="eyebrow">{hoursLocation.eyebrow}</p>
            <h2 className="display-lg mt-4">{hoursLocation.heading}</h2>

            <dl className="mt-8 border-t">
              {business.hours.map((entry) => (
                <div key={entry.days} className="border-b py-5">
                  <dt className="text-[15px] font-medium">{entry.days}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-muted">
                    {entry.time}
                  </dd>
                </div>
              ))}
            </dl>

            <address className="mt-7 max-w-[34ch] text-[16px] not-italic leading-relaxed text-muted">
              {business.address}
            </address>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href={business.phoneHref} variant="primary">
                {hoursLocation.callCta}
              </Button>

              <a
                href={business.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps border-b border-ink pb-1 transition-colors duration-300 hover:border-primary hover:text-primary"
              >
                {hoursLocation.directionsCta}
              </a>
            </div>
          </FadeUp>

          <FadeUp className="md:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden border md:aspect-[3/2]">
              <iframe
                src={business.mapsEmbed}
                title={hoursLocation.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale"
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
