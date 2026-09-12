import site from "@/content/site";

/**
 * Slow 30s hairline-bordered ticker. The track is duplicated so the loop is
 * seamless; the duplicate is hidden from assistive tech.
 */
export default function Marquee() {
  const items = site.home.marquee;

  function Track({ ariaHidden }: { ariaHidden: boolean }) {
    return (
      <div
        aria-hidden={ariaHidden || undefined}
        className="flex shrink-0 items-center"
      >
        {items.map((item) => (
          <span key={item} className="flex items-center">
            <span className="label-caps whitespace-nowrap px-6 py-4 text-muted">
              {item}
            </span>
            <span aria-hidden="true" className="text-muted">
              —
            </span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <section aria-label="House specialities" className="border-y bg-bg">
      <div className="flex overflow-hidden">
        <div className="animate-marquee flex min-w-full shrink-0 items-center">
          <Track ariaHidden={false} />
          <Track ariaHidden />
          <Track ariaHidden />
          <Track ariaHidden />
        </div>
        <div className="animate-marquee flex min-w-full shrink-0 items-center">
          <Track ariaHidden />
          <Track ariaHidden />
          <Track ariaHidden />
          <Track ariaHidden />
        </div>
      </div>
    </section>
  );
}
