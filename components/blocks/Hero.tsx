import Image from "next/image";
import Button from "@/components/ui/Button";
import site from "@/content/site";

/**
 * Full-viewport hero. The photograph performs a single slow 12s zoom on load;
 * the headline stack sits bottom-left over a soft ink scrim for contrast.
 */
export default function Hero() {
  const { hero } = site.home;

  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink md:min-h-[92svh]">
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.image}
          alt={hero.alt}
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="animate-hero-zoom object-cover object-center"
        />
        {/* Flat scrim (not a gradient) keeps the cream type legible. */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/45" />
      </div>

      <div className="mx-auto w-full max-w-shell px-5 pb-16 pt-28 sm:px-8 md:pb-24">
        <p className="text-[12px] uppercase leading-normal tracking-[0.15em] text-bg/80">
          {hero.eyebrow}
        </p>

        <h1 className="display-hero mt-5 max-w-[16ch] italic text-bg">
          {site.business.tagline}
        </h1>

        <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-bg/85">
          {site.business.description}
        </p>

        <div className="mt-9">
          <Button href={hero.ctaHref} variant="ghost-light">
            {hero.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
