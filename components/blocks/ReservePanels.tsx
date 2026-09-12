import Button from "@/components/ui/Button";
import site from "@/content/site";

/**
 * Side information panel on the Reserve page:
 * phone booking, direct WhatsApp link, service hours, and address.
 */
export default function ReservePanels() {
  const { reservation, business } = site;

  return (
    <div className="border-t pt-8 md:border-t-0 md:pt-0">
      <h2 className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] italic tracking-[-0.02em]">
        {reservation.talkPanel.heading}
      </h2>

      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        {reservation.talkPanel.body}
      </p>

      <a
        href={business.phoneHref}
        className="mt-7 block font-display text-[clamp(1.5rem,3vw,2rem)] tracking-[-0.02em] transition-colors duration-300 hover:text-primary"
      >
        {business.phone}
      </a>

      <div className="mt-7">
        <Button
          href={business.whatsapp}
          variant="ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          {reservation.talkPanel.whatsappCta}
        </Button>
      </div>

      <dl className="mt-10 border-t">
        {business.hours.map((entry) => (
          <div key={entry.days} className="border-b py-4">
            <dt className="text-[14px] font-medium">{entry.days}</dt>
            <dd className="mt-1 text-[14px] leading-relaxed text-muted">
              {entry.time}
            </dd>
          </div>
        ))}
      </dl>

      <address className="mt-6 max-w-[32ch] text-[14px] not-italic leading-relaxed text-muted">
        {business.address}
      </address>
    </div>
  );
}
