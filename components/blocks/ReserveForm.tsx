"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Field, { fieldClasses } from "@/components/ui/Field";
import {
  ErrorNotice,
  NotConfiguredNotice,
  SuccessPanel,
} from "@/components/blocks/FormNotice";
import site from "@/content/site";
import {
  isFormConfigured,
  isValidIndianPhone,
  submitToWeb3Forms,
  todayISO,
} from "@/lib/forms";

interface FormState {
  name: string;
  phone: string;
  date: string;
  time: string;
  party: string;
  occasion: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "",
  party: "",
  occasion: "",
};

export default function ReserveForm() {
  const { reservation, business } = site;

  const configured = isFormConfigured();
  const minDate = useMemo(() => todayISO(), []);

  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Clear the field error as soon as the guest starts correcting it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function validate(): Errors {
    const next: Errors = {};

    if (!values.name.trim()) next.name = "Please tell us your name.";
    else if (values.name.trim().length < 2) next.name = "That name looks too short.";

    if (!values.phone.trim()) next.phone = "We need a phone number to confirm.";
    else if (!isValidIndianPhone(values.phone))
      next.phone = "Enter a 10-digit Indian mobile number.";

    if (!values.date) next.date = "Choose a date.";
    else if (values.date < minDate) next.date = "Please choose today or a later date.";

    if (!values.time) next.time = "Choose a time.";
    if (!values.party) next.party = "How many guests?";

    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !configured) return;

    setApiError(null);

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      document.getElementById(first)?.focus();
      return;
    }

    setSubmitting(true);

    const occasionLabel =
      reservation.occasions.find((option) => option.value === values.occasion)?.label ??
      "No occasion";

    const result = await submitToWeb3Forms({
      subject: `Table request — ${values.name} — ${values.date} ${values.time}`,
      from_name: `${business.name} website`,
      form_type: "Reservation request",
      name: values.name.trim(),
      phone: values.phone.trim(),
      date: values.date,
      time: values.time,
      party_size: values.party,
      occasion: occasionLabel,
    });

    setSubmitting(false);

    // Success is only ever set on a confirmed 200 from the API.
    if (result.ok) {
      setSucceeded(true);
      setValues(EMPTY);
      return;
    }

    setApiError(result.message ?? null);
  }

  if (succeeded) {
    return (
      <SuccessPanel
        heading="Request received — we'll confirm on WhatsApp shortly."
        body={reservation.sub}
      />
    );
  }

  const isLargeParty = values.party === reservation.largePartyValue;

  return (
    <div>
      {!configured ? <NotConfiguredNotice /> : null}

      <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name} className="sm:col-span-2">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            disabled={!configured || submitting}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClasses}
            placeholder="Your full name"
          />
        </Field>

        <Field
          id="phone"
          label="Phone"
          required
          error={errors.phone}
          hint="10-digit Indian mobile number."
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={14}
            value={values.phone}
            disabled={!configured || submitting}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
            className={fieldClasses}
            placeholder="98765 43210"
          />
        </Field>

        <Field id="date" label="Date" required error={errors.date}>
          <input
            id="date"
            name="date"
            type="date"
            min={minDate}
            value={values.date}
            disabled={!configured || submitting}
            onChange={(event) => update("date", event.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "date-error" : undefined}
            className={fieldClasses}
          />
        </Field>

        <Field id="time" label="Time" required error={errors.time}>
          <select
            id="time"
            name="time"
            value={values.time}
            disabled={!configured || submitting}
            onChange={(event) => update("time", event.target.value)}
            aria-invalid={Boolean(errors.time)}
            aria-describedby={errors.time ? "time-error" : undefined}
            className={fieldClasses}
          >
            <option value="">Select a time</option>
            {reservation.timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Field>

        <Field id="party" label="Party size" required error={errors.party}>
          <select
            id="party"
            name="party"
            value={values.party}
            disabled={!configured || submitting}
            onChange={(event) => update("party", event.target.value)}
            aria-invalid={Boolean(errors.party)}
            aria-describedby={errors.party ? "party-error" : undefined}
            className={fieldClasses}
          >
            <option value="">Select</option>
            {reservation.partySizes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id="occasion" label="Occasion" className="sm:col-span-2">
          <select
            id="occasion"
            name="occasion"
            value={values.occasion}
            disabled={!configured || submitting}
            onChange={(event) => update("occasion", event.target.value)}
            className={fieldClasses}
          >
            {reservation.occasions.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        {isLargeParty ? (
          <p className="text-[14px] leading-relaxed text-muted sm:col-span-2">
            {reservation.largePartyNotice}{" "}
            <Link
              href="/private-dining"
              className="border-b border-primary text-primary transition-colors duration-300 hover:border-ink hover:text-ink"
            >
              See private dining
            </Link>
            .
          </p>
        ) : null}

        <div className="sm:col-span-2">
          <Button type="submit" variant="primary" disabled={!configured || submitting}>
            {submitting ? "Sending…" : "Request a table"}
          </Button>

          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            This is a request, not a confirmed booking — we reply on WhatsApp.
          </p>
        </div>
      </form>

      {apiError ? <ErrorNotice message={apiError} /> : null}
    </div>
  );
}
