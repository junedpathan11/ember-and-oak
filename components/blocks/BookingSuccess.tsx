"use client";

import { useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import site from "@/content/site";
import { getReservationWhatsAppUrl } from "@/lib/whatsapp";

export interface BookingSummary {
  ref: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  party: string;
  occasion?: string;
}

interface BookingSuccessProps {
  summary: BookingSummary;
  onReset?: () => void;
}

/**
 * Polished booking-request success state.
 * Clearly informs the guest that this is a request pending WhatsApp confirmation.
 */
export default function BookingSuccess({ summary, onReset }: BookingSuccessProps) {
  const [copied, setCopied] = useState(false);

  const formattedDate = summary.date
    ? new Date(summary.date + "T00:00:00").toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : summary.date;

  const partyLabel =
    site.reservation.partySizes.find((p) => p.value === summary.party)?.label ??
    `${summary.party} guests`;

  const copyText = [
    `Ember & Oak — Booking Request [${summary.ref}]`,
    `Name: ${summary.name}`,
    `Phone: ${summary.phone}`,
    `Date: ${formattedDate}`,
    `Time: ${summary.time}`,
    `Party: ${partyLabel}`,
    summary.occasion && summary.occasion !== "No occasion"
      ? `Occasion: ${summary.occasion}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  async function handleCopy() {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(copyText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = copyText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  }

  const whatsappUrl = getReservationWhatsAppUrl({
    name: summary.name,
    phone: summary.phone,
    date: summary.date,
    time: summary.time,
    party: partyLabel,
    occasion: summary.occasion,
    ref: summary.ref,
  });

  return (
    <div
      role="status"
      className="border border-hairline bg-surface p-6 sm:p-8 md:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4">
        <p className="eyebrow">Booking Request Received</p>
        <span className="font-mono text-[13px] font-semibold tracking-wider text-primary">
          REF: {summary.ref}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] italic leading-snug tracking-[-0.02em]">
        We’ve received your table request.
      </h3>

      <p className="mt-3 text-[15px] leading-relaxed text-muted">
        This is a request, not an instant booking. Our floor team will check
        table availability and message you on WhatsApp shortly to confirm.
      </p>

      {/* Booking summary card */}
      <div className="mt-6 border border-hairline bg-bg/50 p-5">
        <h4 className="eyebrow mb-3">Request Summary</h4>
        <dl className="grid grid-cols-2 gap-y-3 text-[14px]">
          <div>
            <dt className="text-muted">Guest Name</dt>
            <dd className="font-medium text-ink">{summary.name}</dd>
          </div>
          <div>
            <dt className="text-muted">Phone</dt>
            <dd className="font-medium text-ink">{summary.phone}</dd>
          </div>
          <div>
            <dt className="text-muted">Date & Time</dt>
            <dd className="font-medium text-ink">
              {formattedDate} at {summary.time}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Party Size</dt>
            <dd className="font-medium text-ink">{partyLabel}</dd>
          </div>
          {summary.occasion && summary.occasion !== "No occasion" ? (
            <div className="col-span-2">
              <dt className="text-muted">Occasion</dt>
              <dd className="font-medium text-ink">{summary.occasion}</dd>
            </div>
          ) : null}
        </dl>
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button
          href={whatsappUrl}
          variant="primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle size={15} aria-hidden="true" className="mr-1 inline" />
          Send Details via WhatsApp
        </Button>

        <button
          type="button"
          onClick={handleCopy}
          className="label-caps inline-flex items-center justify-center gap-2 rounded-button border border-ink bg-transparent px-5 py-[14px] text-ink transition-colors duration-300 hover:bg-ink hover:text-bg"
        >
          {copied ? (
            <>
              <Check size={14} aria-hidden="true" className="text-primary" />
              Copied to clipboard
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden="true" />
              Copy details
            </>
          )}
        </button>
      </div>

      <div className="mt-8 border-t border-hairline pt-5 text-[14px] text-muted">
        <p>
          Need to change or cancel? Call us at{" "}
          <a
            href={site.business.phoneHref}
            className="text-ink underline transition-colors duration-300 hover:text-primary"
          >
            {site.business.phone}
          </a>{" "}
          or reply to our WhatsApp message.
        </p>

        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="mt-4 text-[13px] text-muted underline transition-colors duration-300 hover:text-ink"
          >
            Submit another table request
          </button>
        ) : null}
      </div>
    </div>
  );
}
