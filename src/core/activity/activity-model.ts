import type { ActivityEvent, Project } from '../projects/model';

const ACTIVITY_TYPES = new Set<ActivityEvent['type']>([
  'added',
  'renamed',
  'removed',
  'archived',
  'app-url-changed',
]);

export interface ActivityReadResult {
  readonly events: readonly ActivityEvent[];
  readonly invalidCount: number;
}

export interface ActivityTarget {
  readonly displayName: string;
  readonly href?: string;
  readonly project?: Project;
}

export interface ActivityDayGroup {
  readonly key: string;
  readonly date: Date;
  readonly events: readonly ActivityEvent[];
}

export interface ActivityWeekGroup {
  readonly key: string;
  readonly start: Date;
  readonly end: Date;
  readonly days: readonly ActivityDayGroup[];
}

function isUtcIsoDate(value: unknown): value is string {
  return typeof value === 'string'
    && value.endsWith('Z')
    && Number.isFinite(Date.parse(value));
}

export function isValidActivityEvent(
  value: unknown,
  expectedUsername?: string,
): value is ActivityEvent {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const event = value as Record<string, unknown>;
  const validId = event.id === undefined
    || (typeof event.id === 'number' && Number.isInteger(event.id) && event.id > 0);
  const validUsername = typeof event.username === 'string'
    && event.username.trim().length > 0
    && (expectedUsername === undefined || event.username === expectedUsername);
  const validProjectId = typeof event.projectId === 'number'
    && Number.isInteger(event.projectId)
    && event.projectId > 0;
  const validType = typeof event.type === 'string'
    && ACTIVITY_TYPES.has(event.type as ActivityEvent['type']);
  const validDetail = event.detail === undefined || typeof event.detail === 'string';

  return validId
    && validUsername
    && validProjectId
    && validType
    && isUtcIsoDate(event.occurredAt)
    && validDetail;
}

export function sortActivityEvents(events: readonly ActivityEvent[]): ActivityEvent[] {
  return [...events].sort((left, right) => {
    const dateOrder = Date.parse(right.occurredAt) - Date.parse(left.occurredAt);
    if (dateOrder !== 0) return dateOrder;
    return (right.id ?? 0) - (left.id ?? 0);
  });
}

function localDateKey(date: Date): string {
  const year = String(date.getFullYear()).padStart(4, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function startOfLocalWeek(date: Date): Date {
  const start = startOfLocalDay(date);
  const mondayOffset = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - mondayOffset);
  return start;
}

export function groupActivityEvents(events: readonly ActivityEvent[]): ActivityWeekGroup[] {
  const weeks = new Map<string, {
    start: Date;
    end: Date;
    days: Map<string, { date: Date; events: ActivityEvent[] }>;
  }>();

  for (const event of sortActivityEvents(events)) {
    const occurred = new Date(event.occurredAt);
    const day = startOfLocalDay(occurred);
    const weekStart = startOfLocalWeek(occurred);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    const weekKey = localDateKey(weekStart);
    const dayKey = localDateKey(day);
    let week = weeks.get(weekKey);
    if (!week) {
      week = { start: weekStart, end: weekEnd, days: new Map() };
      weeks.set(weekKey, week);
    }
    let dayGroup = week.days.get(dayKey);
    if (!dayGroup) {
      dayGroup = { date: day, events: [] };
      week.days.set(dayKey, dayGroup);
    }
    dayGroup.events.push(event);
  }

  return [...weeks.entries()].map(([key, week]) => ({
    key,
    start: week.start,
    end: week.end,
    days: [...week.days.entries()].map(([dayKey, day]) => ({
      key: dayKey,
      date: day.date,
      events: day.events,
    })),
  }));
}

export function resolveActivityTarget(
  event: ActivityEvent,
  projects: readonly Project[],
): ActivityTarget {
  const project = projects.find((candidate) => candidate.id === event.projectId);
  if (project) {
    return {
      displayName: project.displayName,
      href: `#/project/${encodeURIComponent(project.repositoryName)}`,
      project,
    };
  }

  const knownName = event.detail?.trim();
  return {
    displayName: knownName || `Projet GitHub #${String(event.projectId)}`,
  };
}

export function activityEventLabel(event: ActivityEvent, target: ActivityTarget): string {
  switch (event.type) {
    case 'added':
      return `${target.displayName} a été ajouté à l’inventaire.`;
    case 'renamed':
      return event.detail?.trim()
        ? `Renommage détecté : ${event.detail.trim()}.`
        : `Un renommage a été détecté pour ${target.displayName}.`;
    case 'removed':
      return `${target.displayName} n’apparaît plus dans le dernier inventaire complet.`;
    case 'archived':
      return `${target.displayName} est désormais signalé comme archivé par GitHub.`;
    case 'app-url-changed':
      return `Un changement d’adresse d’application a été détecté pour ${target.displayName}.`;
  }
}
