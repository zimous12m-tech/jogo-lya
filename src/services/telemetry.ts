export type TelemetryEvent =
  | { name: 'app_open' }
  | { name: 'level_start'; levelId: string }
  | { name: 'level_complete'; levelId: string; correct: number; total: number }
  | { name: 'question_answered'; questionId: string; correct: boolean };

let enabled = false;
const key = import.meta.env.VITE_POSTHOG_KEY;
const host = import.meta.env.VITE_POSTHOG_HOST;

export function setTelemetryConsent(value: boolean): void {
  enabled = value && Boolean(key) && Boolean(host);
}

export function track(event: TelemetryEvent): void {
  if (!enabled || !key || !host) return;
  void fetch(host + '/capture/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ api_key: key, event: event.name, properties: event, distinct_id: 'anon' })
  }).catch(() => undefined);
}
