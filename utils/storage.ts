const KEY = 'gemini-raffle-options';

/** The list saved in this browser, or null when nothing was saved yet (the first visit). */
export function loadOptions(): string[] | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === null) return null;
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.every((item) => typeof item === 'string') ? parsed : null;
  } catch {
    return null;
  }
}

/** Saves the list in this browser. A blocked or full storage just means the list lasts for the visit. */
export function saveOptions(names: readonly string[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(names));
  } catch {
    // Storage can be blocked: nothing else depends on the save.
  }
}
