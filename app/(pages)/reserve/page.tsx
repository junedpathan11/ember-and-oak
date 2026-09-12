import type { Metadata } from "next";
import ReserveForm from "@/components/blocks/ReserveForm";
import ReservePanels from "@/components/blocks/ReservePanels";
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
  const { reservation } = site;

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

          {/* Prefer to talk & Hours */}
          <FadeUp className="md:col-span-4 md:col-start-9">
            <ReservePanels />
          </FadeUp>
        </div>
      </section>
    </>
  );
}
