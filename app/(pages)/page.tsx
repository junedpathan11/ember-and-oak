import type { Metadata } from "next";
import Hero from "@/components/blocks/Hero";
import Marquee from "@/components/blocks/Marquee";
import DishStrip from "@/components/blocks/DishStrip";
import AboutTeaser from "@/components/blocks/AboutTeaser";
import Testimonials from "@/components/blocks/Testimonials";
import HoursLocation from "@/components/blocks/HoursLocation";
import CTABanner from "@/components/blocks/CTABanner";
import JsonLd from "@/components/ui/JsonLd";
import site from "@/content/site";
import { buildMetadata, restaurantJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: `${site.business.name} — ${site.business.tagline}`,
  description: site.business.description,
  path: "/",
});

export default function HomePage() {
  const { ctaBanner } = site.home;

  return (
    <>
      <JsonLd data={restaurantJsonLd()} />
      <Hero />
      <Marquee />
      <DishStrip />
      <AboutTeaser />
      <Testimonials />
      <HoursLocation />
      <CTABanner
        heading={ctaBanner.heading}
        cta={ctaBanner.cta}
        ctaHref={ctaBanner.ctaHref}
        body={site.reservation.sub}
      />
    </>
  );
}
