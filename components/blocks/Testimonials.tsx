import { Star } from "lucide-react";
import FadeUp from "@/components/ui/FadeUp";
import SectionHeading from "@/components/ui/SectionHeading";
import site from "@/content/site";

/** Five filled lucide stars. */
function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="Five out of five">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={13}
          strokeWidth={0}
          className="fill-primary"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

/** Three hairline-separated quotes set in Fraunces italic. */
export default function Testimonials() {
  const { testimonials } = site.home;

  return (
    <section className="border-t">
      <div className="mx-auto max-w-shell px-5 py-16 sm:px-8 md:py-24">
        <FadeUp>
          <SectionHeading eyebrow={testimonials.eyebrow}>
            {testimonials.heading}
          </SectionHeading>
        </FadeUp>

        <div className="mt-12 md:mt-16">
          {site.testimonials.map((testimonial) => (
            <FadeUp
              as="figure"
              key={testimonial.author}
              className="grid gap-4 border-t py-9 md:grid-cols-12 md:gap-10 md:py-11"
            >
              <div className="md:col-span-3">
                <Stars />
              </div>

              <div className="md:col-span-9">
                <blockquote>
                  <p className="font-display text-[clamp(1.25rem,2.2vw,1.6rem)] italic leading-snug tracking-[-0.02em]">
                    “{testimonial.quote}”
                  </p>
                </blockquote>

                <figcaption className="eyebrow mt-5">
                  {testimonial.author} · {testimonial.source}
                </figcaption>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
