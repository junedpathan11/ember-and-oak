import type { Metadata } from "next";
import Image from "next/image";
import CTABanner from "@/components/blocks/CTABanner";
import EnquiryForm from "@/components/blocks/EnquiryForm";
import FadeUp from "@/components/ui/FadeUp";
import JsonLd from "@/components/ui/JsonLd";
import SectionHeading from "@/components/ui/SectionHeading";
import site from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Private Dining",
  description:
    "Two private rooms and a courtyard for 12 to 90 guests in Surat. Set menus from ₹1,450 per guest, with vegetarian and Jain options.",
  path: "/private-dining",
  image: site.privateDining.hero.image,
});

export default function PrivateDiningPage() {
  const { privateDining } = site;
  const { hero } = privateDining;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd("Private Dining", "/private-dining")} />

      {/* Hero */}
      <section className="relative isolate flex min-h-[60svh] items-end overflow-hidden bg-ink md:min-h-[70svh]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={hero.image}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
        </div>

        <div className="mx-auto w-full max-w-shell px-5 pb-14 pt-24 sm:px-8 md:pb-20">
          <p className="text-[12px] uppercase leading-normal tracking-[0.15em] text-bg/80">
            {hero.eyebrow}
          </p>
          <h1 className="display-hero mt-5 max-w-[14ch] italic text-bg">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-bg/85">
            {privateDining.intro}
          </p>
        </div>
      </section>

      {/* Rooms */}
      <section className="mx-auto max-w-shell px-5 py-16 sm:px-8 md:py-24">
        <FadeUp>
          <SectionHeading eyebrow="The Rooms">Space to suit the evening.</SectionHeading>
        </FadeUp>

        <FadeUp className="mt-10 md:mt-14">
          {/* Column headers are hidden on mobile, where each row stacks. */}
          <div className="hidden grid-cols-12 gap-6 border-b pb-4 md:grid">
            <p className="eyebrow col-span-5">Room</p>
            <p className="eyebrow col-span-4">Capacity</p>
            <p className="eyebrow col-span-3 md:text-right">Minimum spend</p>
          </div>

          <ul>
            {privateDining.rooms.map((room) => (
              <li
                key={room.name}
                className="group grid gap-1.5 border-b py-6 md:grid-cols-12 md:items-baseline md:gap-6 md:py-7"
              >
                <h3 className="font-display text-[20px] leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-primary md:col-span-5">
                  {room.name}
                </h3>
                <p className="text-[15px] text-muted md:col-span-4">{room.capacity}</p>
                <p className="text-[15px] tabular-nums md:col-span-3 md:text-right">
                  {room.minSpend}
                </p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </section>

      {/* Set menus */}
      <section className="border-t bg-surface">
        <div className="mx-auto max-w-shell px-5 py-16 sm:px-8 md:py-24">
          <FadeUp>
            <SectionHeading eyebrow="Set Menus">Everything, decided in advance.</SectionHeading>
            <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">
              {privateDining.setMenuNote}
            </p>
          </FadeUp>

          <FadeUp className="mt-10 md:mt-14">
            <ul className="border-t">
              {privateDining.setMenus.map((menu) => (
                <li
                  key={menu.name}
                  className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b py-6"
                >
                  <h3 className="font-display text-[20px] leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-primary">
                    {menu.name}
                  </h3>

                  <span
                    aria-hidden="true"
                    className="mb-[3px] hidden min-w-6 flex-1 self-end border-b border-dotted border-hairline sm:block"
                  />

                  <p className="font-display text-[20px] leading-tight tabular-nums">
                    {menu.price}
                  </p>

                  <p className="w-full text-[15px] leading-relaxed text-muted">
                    {menu.note}
                  </p>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* Enquiry */}
      <section className="border-t">
        <div className="mx-auto max-w-shell px-5 py-16 sm:px-8 md:py-24">
          <div className="grid gap-12 md:grid-cols-12 md:gap-14">
            <FadeUp className="md:col-span-4">
              <SectionHeading eyebrow="Enquire">Tell us about the occasion.</SectionHeading>
              <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">
                Send a few details and our private dining team will come back with
                availability, a set menu and a quote.
              </p>
              <a
                href={site.business.phoneHref}
                className="mt-8 block font-display text-[clamp(1.35rem,2.6vw,1.75rem)] tracking-[-0.02em] transition-colors duration-300 hover:text-primary"
              >
                {site.business.phone}
              </a>
            </FadeUp>

            <FadeUp className="md:col-span-7 md:col-start-6">
              <h2 className="sr-only">Private dining enquiry form</h2>
              <EnquiryForm />
            </FadeUp>
          </div>
        </div>
      </section>

      <CTABanner
        heading="Just the two of you?"
        body="Our dining room takes walk-ins, but weekends book out early."
        cta="Reserve a Table"
        ctaHref="/reserve"
      />
    </>
  );
}
