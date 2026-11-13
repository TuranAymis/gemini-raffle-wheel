/** The visitor's answer to the cookie question. Google's ad script (and its cookies) runs only after "accepted". */
export type Consent = 'accepted' | 'declined';

const KEY = 'kurala-consent';

export function readConsent(): Consent | null {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === 'accepted' || saved === 'declined' ? saved : null;
  } catch {
    return null;
  }
}

/** Remembers the answer. A blocked storage means the question is asked again on the next visit. */
export function writeConsent(consent: Consent): void {
  try {
    localStorage.setItem(KEY, consent);
  } catch {
    // Storage can be blocked: nothing else depends on the saved answer.
  }
}
