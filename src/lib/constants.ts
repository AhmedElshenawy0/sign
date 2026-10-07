export const COOKIE_NAME = "admin_token";

/** Egypt mobile 01500220250 → E.164 without plus. */
export const WHATSAPP_NUMBER_E164 = "201500220250";

export function whatsappRequestUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${encodeURIComponent(message)}`;
}
