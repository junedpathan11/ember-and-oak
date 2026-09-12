import Button from "@/components/ui/Button";
import FadeUp from "@/components/ui/FadeUp";

interface CTABannerProps {
  heading: string;
  cta: string;
  ctaHref: string;
  body?: string;
}

/** Full-width ink band with cream type and a primary action. */
export default function CTABanner({ heading, cta, ctaHref, body }: CTABannerProps) {
  return (
    <section className="bg-ink">
      <FadeUp className="mx-auto flex max-w-shell flex-col items-start gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-center md:justify-between md:py-20">
        <div>
          <h2 className="display-xl italic text-bg">{heading}</h2>
          {body ? (
            <p className="mt-4 max-w-[44ch] text-[16px] leading-relaxed text-bg/75">
              {body}
            </p>
          ) : null}
        </div>

        <Button href={ctaHref} variant="primary" className="shrink-0">
          {cta}
        </Button>
      </FadeUp>
    </section>
  );
}
