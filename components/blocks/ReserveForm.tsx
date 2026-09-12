"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Field, { fieldClasses } from "@/components/ui/Field";
import BookingSuccess, { type BookingSummary } from "@/components/blocks/BookingSuccess";
import {
  ErrorNotice,
  NotConfiguredNotice,
} from "@/components/blocks/FormNotice";
import site from "@/content/site";
import {
  isFormConfigured,
  isValidIndianPhone,
  submitToWeb3Forms,
  todayISO,
} from "@/lib/forms";
import { getReservationWhatsAppUrl } from "@/lib/whatsapp";

interface ReserveFormProps {
  requestedDish?: string;
}

interface FormState {
  name: string;
  phone: string;
  date: string;
  time: string;
  party: string;
  dish: string;
  occasion: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  phone: "",
  date: "",
  time: "",
  party: "",
  dish: "",
  occasion: "",
};

const MENU_DISHES = site.menu.flatMap((category) => category.dishes);

function initialValues(requestedDish?: string): FormState {
  const dish = MENU_DISHES.find(
    (option) => option.name === requestedDish || option.slug === requestedDish,
  );

  return { ...EMPTY, dish: dish?.slug ?? "" };
}

function generateBookingRef(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let result = "EO-";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function ReserveForm({ requestedDish }: ReserveFormProps) {
  const { reservation, business } = site;

  const configured = isFormConfigured();
  const minDate = useMemo(() => todayISO(), []);

  const [values, setValues] = useState<FormState>(() => initialValues(requestedDish));
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [bookingSummary, setBookingSummary] = useState<BookingSummary | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
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

  // Dynamic WhatsApp link based on current form inputs
  const dynamicWhatsAppUrl = useMemo(() => {
    const occasionLabel =
      reservation.occasions.find((opt) => opt.value === values.occasion)?.label ??
      undefined;

    const partyLabel =
      reservation.partySizes.find((opt) => opt.value === values.party)?.label ??
      values.party;

    const dishName = MENU_DISHES.find((dish) => dish.slug === values.dish)?.name;

    return getReservationWhatsAppUrl({
      name: values.name,
      phone: values.phone,
      date: values.date,
      time: values.time,
      party: partyLabel,
      dish: dishName,
      occasion: occasionLabel,
    });
  }, [values, reservation.occasions, reservation.partySizes]);

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

    const dishName =
      MENU_DISHES.find((dish) => dish.slug === values.dish)?.name ??
      reservation.noSpecificDishLabel;

    const ref = generateBookingRef();

    const result = await submitToWeb3Forms({
      subject: `Table request [${ref}] — ${values.name} — ${values.date} ${values.time}`,
      from_name: `${business.name} website`,
      form_type: "Reservation request",
      booking_ref: ref,
      name: values.name.trim(),
      phone: values.phone.trim(),
      date: values.date,
      time: values.time,
      party_size: values.party,
      dish_of_interest: dishName,
      occasion: occasionLabel,
    });

    setSubmitting(false);

    // Success is only ever set on a confirmed 200 from the API.
    if (result.ok) {
      setBookingSummary({
        ref,
        name: values.name.trim(),
        phone: values.phone.trim(),
        date: values.date,
        time: values.time,
        party: values.party,
        dish: values.dish ? dishName : undefined,
        occasion: occasionLabel,
      });
      setValues({ ...EMPTY });
      return;
    }

    setApiError(result.message ?? null);
  }

  if (bookingSummary) {
    return (
      <BookingSuccess
        summary={bookingSummary}
        onReset={() => setBookingSummary(null)}
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

        <Field id="dish" label="Dish of interest" className="sm:col-span-2">
          <select
            id="dish"
            name="dish_of_interest"
            value={values.dish}
            disabled={!configured || submitting}
            onChange={(event) => update("dish", event.target.value)}
            className={fieldClasses}
          >
            <option value="">{reservation.noSpecificDishLabel}</option>
            {site.menu.map((category) => (
              <optgroup key={category.id} label={category.label}>
                {category.dishes.map((dish) => (
                  <option key={dish.slug} value={dish.slug}>
                    {dish.name}
                  </option>
                ))}
              </optgroup>
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

        <div className="space-y-4 sm:col-span-2">
          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" variant="primary" disabled={!configured || submitting}>
              {submitting ? "Sending request…" : "Request a table"}
            </Button>

            <a
              href={dynamicWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps inline-flex items-center gap-2 rounded-button border border-hairline bg-surface px-5 py-[14px] text-ink transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              <MessageCircle size={15} aria-hidden="true" />
              Prefer WhatsApp?
            </a>
          </div>

          <p className="text-[13px] leading-relaxed text-muted">
            This is a booking request, not an instant confirmation. Our team
            verifies table availability and confirms on WhatsApp.
          </p>
        </div>
      </form>

      {apiError ? <ErrorNotice message={apiError} /> : null}
    </div>
  );
}
