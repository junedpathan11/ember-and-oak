import Link from "next/link";
import DishImage from "@/components/ui/DishImage";
import FadeUp from "@/components/ui/FadeUp";
import SectionHeading from "@/components/ui/SectionHeading";
import site from "@/content/site";

/**
 * Signature dishes in an alternating editorial layout — image and text swap
 * sides on every row, separated by hairlines. Deliberately not a card grid.
 */
export default function DishStrip() {
  const { signature } = site.home;

  return (
    <section className="mx-auto max-w-shell px-5 py-16 sm:px-8 md:py-24">
      <FadeUp>
        <SectionHeading eyebrow={signature.eyebrow}>
          {signature.heading}
        </SectionHeading>
      </FadeUp>

      <div className="mt-12 md:mt-16">
        {site.signatureDishes.map((dish, index) => {
          const reversed = index % 2 === 1;

          return (
            <FadeUp
              as="article"
              key={dish.name}
              className="group grid gap-6 border-t py-10 md:grid-cols-12 md:items-center md:gap-12 md:py-14"
            >
              {/* Columns are placed explicitly so the reversed rows stay
                  flush with the outer margins instead of auto-flowing. */}
              <div
                className={`md:col-span-6 ${
                  reversed ? "md:order-2 md:col-start-7" : "md:order-1 md:col-start-1"
                }`}
              >
                <DishImage
                  src={dish.image}
                  alt={dish.alt}
                  ratio={reversed ? "landscape" : "portrait"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              <div
                className={`md:col-span-5 ${
                  reversed ? "md:order-1 md:col-start-1" : "md:order-2 md:col-start-8"
                }`}
              >
                <p className="eyebrow">
                  {String(index + 1).padStart(2, "0")} ·{" "}
                  {dish.veg ? "Vegetarian" : "Non-vegetarian"}
                </p>

                <h3 className="display-lg mt-4">{dish.name}</h3>

                <p className="mt-4 max-w-prose text-[16px] leading-relaxed text-muted">
                  {dish.desc}
                </p>

                <p className="mt-6 font-display text-[20px] tabular-nums">
                  ₹{dish.price}
                </p>

                <Link
                  href="/menu"
                  className="label-caps mt-7 inline-block border-b border-ink pb-1 transition-colors duration-300 hover:border-primary hover:text-primary"
                >
                  See the full menu
                </Link>
              </div>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}
