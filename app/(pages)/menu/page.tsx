import type { Metadata } from "next";
import MenuTabs from "@/components/blocks/MenuTabs";
import Button from "@/components/ui/Button";
import FadeUp from "@/components/ui/FadeUp";
import JsonLd from "@/components/ui/JsonLd";
import site from "@/content/site";
import { breadcrumbJsonLd, buildMetadata, menuJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Menu",
  description:
    "Starters, mains, desserts and drinks from the Ember & Oak charcoal grill — smoked paneer tikka, 12-hour butter chicken, 48-hour dal makhani.",
  path: "/menu",
});

export default function MenuPage() {
  const { menuPage, business } = site;

  return (
    <>
      <JsonLd data={menuJsonLd()} />
      <JsonLd data={breadcrumbJsonLd("Menu", "/menu")} />

      {/* Page header */}
      <section className="border-b">
        <div className="mx-auto max-w-shell px-5 pb-12 pt-14 sm:px-8 md:pb-16 md:pt-20">
          <FadeUp>
            <p className="eyebrow">{menuPage.eyebrow}</p>
            <h1 className="display-xl mt-4 max-w-[18ch]">{menuPage.heading}</h1>
            <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-muted">
              {business.description}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Categories + rows */}
      <section className="mx-auto max-w-shell px-5 py-12 sm:px-8 md:py-16">
        <MenuTabs />

        <p className="mt-10 border-t pt-6 text-[13px] leading-relaxed text-muted">
          {menuPage.vegTag} denotes a vegetarian dish. All prices in ₹ and
          inclusive of taxes. Please tell us about allergies before you order.
        </p>
      </section>

      {/* CTA strip */}
      <section className="border-t bg-surface">
        <FadeUp className="mx-auto flex max-w-shell flex-col items-start gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between md:py-14">
          <h2 className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] italic tracking-[-0.02em]">
            {menuPage.cta.heading}
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <Button href={menuPage.cta.primaryHref} variant="primary">
              {menuPage.cta.primary}
            </Button>
            <Button
              href={business.whatsapp}
              variant="ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              {menuPage.cta.secondary}
            </Button>
          </div>
        </FadeUp>
      </section>
    </>
  );
}
