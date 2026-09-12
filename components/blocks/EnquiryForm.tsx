"use client";

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
  guests: string;
  room: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  phone: "",
  date: "",
  guests: "",
  room: "",
  message: "",
};

/** Private dining enquiry — same Web3Forms pattern as /reserve, plus room select. */
export default function EnquiryForm() {
  const { privateDining, business } = site;

  const configured = isFormConfigured();
  const minDate = useMemo(() => todayISO(), []);

  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
  }

  function validate(): Errors {
    const next: Errors = {};

    if (!values.name.trim()) next.name = "Please tell us your name.";
    else if (values.name.trim().length < 2) next.name = "That name looks too short.";

    if (!values.phone.trim()) next.phone = "We need a phone number to reply.";
    else if (!isValidIndianPhone(values.phone))
      next.phone = "Enter a 10-digit Indian mobile number.";

    if (!values.date) next.date = "Choose a preferred date.";
    else if (values.date < minDate) next.date = "Please choose today or a later date.";

    if (!values.guests.trim()) next.guests = "Roughly how many guests?";
    else if (!/^\d{1,3}$/.test(values.guests.trim()))
      next.guests = "Enter a number of guests.";

    if (!values.room) next.room = "Choose a room.";

    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || !configured) return;

    setApiError(null);

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }

    setSubmitting(true);

    const result = await submitToWeb3Forms({
      subject: `Private dining enquiry — ${values.name} — ${values.date}`,
      from_name: `${business.name} website`,
      form_type: "Private dining enquiry",
      name: values.name.trim(),
      phone: values.phone.trim(),
      date: values.date,
      guests: values.guests.trim(),
      preferred_room: values.room,
      message: values.message.trim() || "—",
    });

    setSubmitting(false);

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
        body="Our private dining team will come back to you with availability and a set menu."
      />
    );
  }

  return (
    <div>
      {!configured ? <NotConfiguredNotice /> : null}

      <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
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

        <Field id="date" label="Preferred date" required error={errors.date}>
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

        <Field id="guests" label="Guests" required error={errors.guests}>
          <input
            id="guests"
            name="guests"
            type="text"
            inputMode="numeric"
            maxLength={3}
            value={values.guests}
            disabled={!configured || submitting}
            onChange={(event) => update("guests", event.target.value)}
            aria-invalid={Boolean(errors.guests)}
            aria-describedby={errors.guests ? "guests-error" : undefined}
            className={fieldClasses}
            placeholder="40"
          />
        </Field>

        <Field
          id="room"
          label="Preferred room"
          required
          error={errors.room}
          className="sm:col-span-2"
        >
          <select
            id="room"
            name="room"
            value={values.room}
            disabled={!configured || submitting}
            onChange={(event) => update("room", event.target.value)}
            aria-invalid={Boolean(errors.room)}
            aria-describedby={errors.room ? "room-error" : undefined}
            className={fieldClasses}
          >
            <option value="">Select a room</option>
            {privateDining.rooms.map((room) => (
              <option key={room.name} value={room.name}>
                {room.name} — {room.capacity}
              </option>
            ))}
            <option value="Not sure yet">Not sure yet</option>
          </select>
        </Field>

        <Field id="message" label="Anything else?" className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            disabled={!configured || submitting}
            onChange={(event) => update("message", event.target.value)}
            className={`${fieldClasses} resize-y`}
            placeholder="Occasion, dietary requirements, timings…"
          />
        </Field>

        <div className="sm:col-span-2">
          <Button type="submit" variant="primary" disabled={!configured || submitting}>
            {submitting ? "Sending…" : "Send enquiry"}
          </Button>

          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            {privateDining.setMenuNote}
          </p>
        </div>
      </form>

      {apiError ? <ErrorNotice message={apiError} /> : null}
    </div>
  );
}
