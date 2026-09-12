import site from "@/content/site";
import { NOT_CONFIGURED_MESSAGE } from "@/lib/forms";

/** Inline notice shown in the form area when no Web3Forms key is configured. */
export function NotConfiguredNotice() {
  return (
    <p
      role="status"
      className="mb-6 border border-hairline bg-surface px-4 py-3 text-[14px] leading-relaxed text-muted"
    >
      {NOT_CONFIGURED_MESSAGE}
    </p>
  );
}

/** Error state shown when the API rejects a submission. */
export function ErrorNotice({ message }: { message: string }) {
  return (
    <p
      role="alert"
      className="mt-6 border border-hairline bg-surface px-4 py-3 text-[14px] leading-relaxed text-ink"
    >
      {message}{" "}
      <a
        href={site.business.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="border-b border-primary text-primary transition-colors duration-300 hover:border-ink hover:text-ink"
      >
        Message us on WhatsApp
      </a>
      .
    </p>
  );
}

/** Success panel that replaces the form on successful submission. */
export function SuccessPanel({
  heading,
  body,
}: {
  heading: string;
  body: string;
}) {
  return (
    <div role="status" className="border border-hairline bg-surface p-8 md:p-10">
      <p className="eyebrow">Request Received</p>
      <h3 className="mt-4 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] italic leading-snug tracking-[-0.02em]">
        {heading}
      </h3>
      <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-muted">
        {body}
      </p>
      <p className="mt-6 text-[15px] leading-relaxed text-muted">
        Need to change something? Call{" "}
        <a
          href={site.business.phoneHref}
          className="text-ink transition-colors duration-300 hover:text-primary"
        >
          {site.business.phone}
        </a>
        .
      </p>
    </div>
  );
}
