import site from "@/content/site";

/** One pass of the ticker copy. Declared at module scope, not during render. */
function Track({ ariaHidden }: { ariaHidden: boolean }) {
  return (
    <div aria-hidden={ariaHidden || undefined} className="flex shrink-0 items-center">
      {site.home.marquee.map((item) => (
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

/** Half of the scroll loop — four passes, enough to fill wide viewports. */
function Half({ labelled }: { labelled: boolean }) {
  return (
    <div className="animate-marquee flex min-w-full shrink-0 items-center">
      <Track ariaHidden={!labelled} />
      <Track ariaHidden />
      <Track ariaHidden />
      <Track ariaHidden />
    </div>
  );
}

/**
 * Slow 30s hairline-bordered ticker. The track is duplicated so the loop is
 * seamless; only the first pass is exposed to assistive technology.
 */
export default function Marquee() {
  return (
    <section aria-label="House specialities" className="border-y bg-bg">
      <div className="flex overflow-hidden">
        <Half labelled />
        <Half labelled={false} />
      </div>
    </section>
  );
}
