const FULL_DATE = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'long',
  timeStyle: 'short',
});

const RELATIVE_DATE = new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' });

export function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : undefined;
}

export function formatFullDate(value: string | undefined): string {
  const date = parseDate(value);
  return date ? FULL_DATE.format(date) : 'Date inconnue';
}

export function formatRelativeDate(value: string | undefined, now = new Date()): string {
  const date = parseDate(value);
  if (!date) return 'activité inconnue';

  const differenceMs = date.getTime() - now.getTime();
  const absoluteMs = Math.abs(differenceMs);
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (absoluteMs < hour) return RELATIVE_DATE.format(Math.round(differenceMs / minute), 'minute');
  if (absoluteMs < day) return RELATIVE_DATE.format(Math.round(differenceMs / hour), 'hour');
  if (absoluteMs < month) return RELATIVE_DATE.format(Math.round(differenceMs / day), 'day');
  if (absoluteMs < year) return RELATIVE_DATE.format(Math.round(differenceMs / month), 'month');
  return RELATIVE_DATE.format(Math.round(differenceMs / year), 'year');
}
