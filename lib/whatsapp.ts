/**
 * Centralized WhatsApp URL generator and configuration.
 *
 * All WhatsApp links throughout the site use standard `https://wa.me/<number>?text=<encoded>`
 * format so visitors open a pre-filled chat with Ember & Oak.
 */

export const WHATSAPP_NUMBER = "916352369937";
export const DISPLAY_PHONE = "+91 63523 69937";
export const TEL_HREF = "tel:+916352369937";

/**
 * Builds a direct wa.me link with an optional pre-filled message.
 */
export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message || !message.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

/** General visitor enquiry. */
export function getGeneralWhatsAppUrl(): string {
  return getWhatsAppUrl(
    "Hi Ember & Oak, I'd like to make an enquiry."
  );
}

/** Contextual enquiry for a specific menu item. */
export function getDishEnquiryWhatsAppUrl(dishName: string): string {
  return getWhatsAppUrl(
    `Hi Ember & Oak, I have an enquiry regarding the "${dishName}".`
  );
}

/** Pre-filled reservation request details from form input. */
export interface ReservationWhatsAppDetails {
  name?: string;
  phone?: string;
  date?: string;
  time?: string;
  party?: string;
  occasion?: string;
  ref?: string;
}

export function getReservationWhatsAppUrl(
  details: ReservationWhatsAppDetails = {}
): string {
  const lines: string[] = ["Hi Ember & Oak, I'd like to request a table:"];

  if (details.ref) lines.push(`• Reference: ${details.ref}`);
  if (details.name && details.name.trim()) lines.push(`• Name: ${details.name.trim()}`);
  if (details.phone && details.phone.trim()) lines.push(`• Phone: ${details.phone.trim()}`);
  if (details.date) lines.push(`• Date: ${details.date}`);
  if (details.time) lines.push(`• Time: ${details.time}`);
  if (details.party) lines.push(`• Guests: ${details.party}`);
  if (details.occasion && details.occasion !== "No occasion") {
    lines.push(`• Occasion: ${details.occasion}`);
  }

  return getWhatsAppUrl(lines.join("\n"));
}

/** Pre-filled private dining enquiry from form input. */
export interface PrivateDiningWhatsAppDetails {
  name?: string;
  phone?: string;
  date?: string;
  guests?: string;
  room?: string;
  message?: string;
}

export function getPrivateDiningWhatsAppUrl(
  details: PrivateDiningWhatsAppDetails = {}
): string {
  const lines: string[] = ["Hi Ember & Oak, I'd like to enquire about private dining:"];

  if (details.name && details.name.trim()) lines.push(`• Name: ${details.name.trim()}`);
  if (details.phone && details.phone.trim()) lines.push(`• Phone: ${details.phone.trim()}`);
  if (details.date) lines.push(`• Preferred Date: ${details.date}`);
  if (details.guests && details.guests.trim()) lines.push(`• Guests: ${details.guests.trim()}`);
  if (details.room && details.room !== "Select a room") lines.push(`• Room: ${details.room}`);
  if (details.message && details.message.trim() && details.message !== "—") {
    lines.push(`• Notes: ${details.message.trim()}`);
  }

  return getWhatsAppUrl(lines.join("\n"));
}
