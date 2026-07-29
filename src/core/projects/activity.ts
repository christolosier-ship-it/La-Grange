import type { ActivityState } from './model';

const DAY = 86_400_000;

export function activityState(pushedAt: string | undefined, archived: boolean, now = new Date()): ActivityState {
  if (archived) return 'archived';
  if (!pushedAt || !Number.isFinite(Date.parse(pushedAt))) return 'sleeping';
  const age = Math.floor((now.getTime() - Date.parse(pushedAt)) / DAY);
  if (age <= 30) return 'active';
  if (age <= 180) return 'maintenance';
  return 'sleeping';
}
