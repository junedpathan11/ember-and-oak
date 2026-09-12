/**
 * Web3Forms integration helpers.
 *
 * The access key is read from NEXT_PUBLIC_WEB3FORMS_KEY. Until a real key is
 * present the forms stay disabled and show an inline notice — a submission is
 * only ever reported as successful on a confirmed HTTP 200 from the API.
 */

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const PLACEHOLDER_KEY = "YOUR_ACCESS_KEY";

export const NOT_CONFIGURED_MESSAGE =
  "Form not configured — add your Web3Forms access key to .env.local.";

export const GENERIC_ERROR_MESSAGE =
  "Something went wrong — please call us or use WhatsApp.";

/**
 * Returns the configured access key, or null when it is missing, empty or
 * still the placeholder shipped in .env.example.
 *
 * NEXT_PUBLIC_* variables are inlined at build time, so this must reference
 * the full literal rather than a computed property name.
 */
export function getAccessKey(): string | null {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.trim();
  if (!key || key === PLACEHOLDER_KEY) return null;
  return key;
}

export function isFormConfigured(): boolean {
  return getAccessKey() !== null;
}

export interface SubmitResult {
  ok: boolean;
  message?: string;
}

/**
 * POSTs a payload to Web3Forms. Resolves `ok: true` only on HTTP 200 with a
 * success response body.
 */
export async function submitToWeb3Forms(
  fields: Record<string, string>
): Promise<SubmitResult> {
  const accessKey = getAccessKey();
  if (!accessKey) return { ok: false, message: NOT_CONFIGURED_MESSAGE };

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ access_key: accessKey, ...fields }),
    });

    // Web3Forms returns a JSON body with { success, message }.
    const data: unknown = await response.json().catch(() => null);
    const message =
      data && typeof data === "object" && "message" in data
        ? String((data as { message: unknown }).message)
        : undefined;
    const success =
      data && typeof data === "object" && "success" in data
        ? Boolean((data as { success: unknown }).success)
        : false;

    if (response.status === 200 && success) return { ok: true, message };

    return { ok: false, message: message ?? GENERIC_ERROR_MESSAGE };
  } catch {
    // Network failure, CORS, offline, etc.
    return { ok: false, message: GENERIC_ERROR_MESSAGE };
  }
}

/** Indian mobile numbers: 10 digits starting 6–9, ignoring spaces and dashes. */
export function isValidIndianPhone(value: string): boolean {
  return /^[6-9]\d{9}$/.test(value.replace(/[\s-]/g, ""));
}

/** Today's date as YYYY-MM-DD in the visitor's local timezone, for `min`. */
export function todayISO(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offsetMs).toISOString().slice(0, 10);
}
