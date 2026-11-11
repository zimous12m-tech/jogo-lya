import { update } from './save';

const today = (): string => new Date().toISOString().slice(0, 10);

function gap(from: string, to: string): number {
  return Math.round((Date.parse(to + 'T00:00:00Z') - Date.parse(from + 'T00:00:00Z')) / 86400000);
}

export function registerPlay(date = today()): number {
  let result = 1;
  update((draft) => {
    if (draft.lastPlayedDate === date) { result = draft.streak || 1; return; }
    draft.streak = draft.lastPlayedDate && gap(draft.lastPlayedDate, date) === 1 ? draft.streak + 1 : 1;
    draft.lastPlayedDate = date;
    result = draft.streak;
  });
  return result;
}
