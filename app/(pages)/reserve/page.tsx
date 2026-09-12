import type { Metadata } from "next";
import ReserveForm from "@/components/blocks/ReserveForm";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/ui/FadeUp";
import JsonLd from "@/components/ui/JsonLd";
import site from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Reserve a Table",
  description:
    "Request a table at Ember & Oak, Ghod Dod Road, Surat. Lunch 12:00–15:30, dinner 19:00–23:00, Tuesday to Sunday.",
  path: "/reserve",
});

export default function ReservePage() {
  const { reservation, business } = site;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Reserve a Table", "/reserve")} />

      <section className="border-b">
        <div className="mx-auto max-w-shell px-5 pb-12 pt-14 sm:px-8 md:pb-16 md:pt-20">
          <FadeUp>
            <p className="eyebrow">{reservation.eyebrow}</p>
            <h1 className="display-xl mt-4">{reservation.heading}</h1>
            <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">
              {reservation.sub}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="mx-auto max-w-shell px-5 py-14 sm:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-14">
          {/* Form */}
          <FadeUp className="md:col-span-7">
            <h2 className="sr-only">Reservation request form</h2>
            <ReserveForm />
          </FadeUp>

          {/* Prefer to talk */}
          <FadeUp className="md:col-span-4 md:col-start-9">
            <div className="border-t pt-8">
              <h2 className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] italic tracking-[-0.02em]">
                {reservation.talkPanel.heading}
              </h2>

              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                {reservation.talkPanel.body}
              </p>

              <a
                href={business.phoneHref}
                className="mt-7 block font-display text-[clamp(1.5rem,3vw,2rem)] tracking-[-0.02em] transition-colors duration-300 hover:text-primary"
              >
                {business.phone}
              </a>

              <div className="mt-7">
                <Button
                  href={business.whatsapp}
                  variant="ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {reservation.talkPanel.whatsappCta}
                </Button>
              </div>

              <dl className="mt-10 border-t">
                {business.hours.map((entry) => (
                  <div key={entry.days} className="border-b py-4">
                    <dt className="text-[14px] font-medium">{entry.days}</dt>
                    <dd className="mt-1 text-[14px] leading-relaxed text-muted">
                      {entry.time}
                    </dd>
                  </div>
                ))}
              </dl>

              <address className="mt-6 max-w-[32ch] text-[14px] not-italic leading-relaxed text-muted">
                {business.address}
              </address>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
