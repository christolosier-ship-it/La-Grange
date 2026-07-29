import type { ActivityState } from './model';

const DAY = 86_400_000;
const ACTIVE_WINDOW = 30 * DAY;
const MAINTENANCE_WINDOW = 180 * DAY;

export function activityState(
  pushedAt: string | undefined,
  archived: boolean,
  now = new Date(),
): ActivityState {
  if (archived) return 'archived';
  if (!pushedAt) return 'sleeping';

  const pushedTime = Date.parse(pushedAt);
  if (!Number.isFinite(pushedTime)) return 'sleeping';

  const elapsed = Math.max(0, now.getTime() - pushedTime);
  if (elapsed <= ACTIVE_WINDOW) return 'active';
  if (elapsed <= MAINTENANCE_WINDOW) return 'maintenance';
  return 'sleeping';
}
