/** Longest address this app will create. Common browsers take far more; this keeps links easy to paste. */
export const MAX_SHARE_LENGTH = 6000;
const PARAM = 'list';

const toBase64Url = (bytes: Uint8Array): string => {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const fromBase64Url = (text: string): Uint8Array => {
  const base64 = text.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
};

export const encodeOptions = (names: readonly string[]): string =>
  toBase64Url(new TextEncoder().encode(JSON.stringify(names)));

/** The names in an encoded token, or null when the token is not a list of names. */
export function decodeOptions(token: string): string[] | null {
  try {
    const parsed: unknown = JSON.parse(new TextDecoder().decode(fromBase64Url(token)));
    return Array.isArray(parsed) && parsed.every((item) => typeof item === 'string') ? parsed : null;
  } catch {
    return null;
  }
}

/** The address that opens the wheel with these names, or null when the list is too long to share. */
export function shareUrl(base: string, names: readonly string[]): string | null {
  const url = `${base}#${PARAM}=${encodeOptions(names)}`;
  return url.length <= MAX_SHARE_LENGTH ? url : null;
}

/** The names carried by an address fragment, or null when the fragment has none. */
export function optionsFromHash(hash: string): string[] | null {
  const match = new RegExp(`(?:^#|&)${PARAM}=([A-Za-z0-9_-]+)`).exec(hash);
  return match ? decodeOptions(match[1]!) : null;
}
