export const WINDOW_MS = 60 * 1000; // 1 minute
export const MAX_REQUESTS = 5;

interface Entry {
  count: number;
  ts: number;
}

const requests = new Map<string, Entry>();

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  let entry = requests.get(key);
  if (!entry) {
    entry = { count: 1, ts: now };
    requests.set(key, entry);
    return true;
  }
  if (now - entry.ts > WINDOW_MS) {
    entry.count = 1;
    entry.ts = now;
    return true;
  }
  entry.count += 1;
  entry.ts = now;
  return entry.count <= MAX_REQUESTS;
}

export function resetRateLimiter() {
  requests.clear();
}
