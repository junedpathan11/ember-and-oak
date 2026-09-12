import Link from "next/link";
import DishImage from "@/components/ui/DishImage";
import FadeUp from "@/components/ui/FadeUp";
import site from "@/content/site";

/**
 * Split about section: kitchen photograph beside the wood-fire philosophy,
 * anchored by an italic Fraunces pull-quote.
 */
export default function AboutTeaser() {
  const { about } = site.home;

  return (
    <section className="border-t bg-surface">
      <div className="mx-auto max-w-shell px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-14">
          <FadeUp className="md:col-span-6">
            <DishImage
              src={about.image}
              alt={about.alt}
              ratio="portrait"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </FadeUp>

          <FadeUp className="md:col-span-6 md:self-center">
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 className="display-lg mt-4">{about.heading}</h2>

            <div className="mt-6 space-y-5">
              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="max-w-prose text-[16px] leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className="mt-9 border-l border-primary pl-6">
              <p className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] italic leading-snug tracking-[-0.02em]">
                {about.pullQuote}
              </p>
            </blockquote>

            <Link
              href={about.linkHref}
              className="label-caps mt-9 inline-block border-b border-ink pb-1 transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              {about.linkLabel}
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
