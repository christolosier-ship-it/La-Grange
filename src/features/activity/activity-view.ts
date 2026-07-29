import type { AppState } from '../../app/store';
import { INITIAL_ACTIVITY_STATE } from '../../core/activity/activity-service';
import {
  activityEventLabel,
  groupActivityEvents,
  resolveActivityTarget,
} from '../../core/activity/activity-model';
import { AppError } from '../../core/errors/app-error';
import type { ActivityEvent, Project } from '../../core/projects/model';
import { formatFullDate, formatRelativeDate } from '../../utils/date';

const DAY_FORMAT = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const RANGE_FORMAT = new Intl.DateTimeFormat('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function readableError(error: Error | undefined): string {
  if (!error) return 'Journal local indisponible.';
  return error instanceof AppError ? error.userMessage : error.message;
}

function createHeader(): HTMLElement {
  const header = document.createElement('header');
  header.className = 'activity-header';
  const eyebrow = document.createElement('p');
  eyebrow.className = 'eyebrow';
  eyebrow.textContent = 'Journal local';
  const title = document.createElement('h1');
  title.tabIndex = -1;
  title.textContent = 'Activité récente';
  const description = document.createElement('p');
  description.className = 'lead';
  description.textContent = 'La chronologie rassemble uniquement les changements réellement détectés lors des synchronisations complètes.';
  header.append(eyebrow, title, description);
  return header;
}

function createStatus(message: string, role: 'status' | 'alert' = 'status'): HTMLElement {
  const panel = document.createElement('p');
  panel.className = role === 'alert' ? 'activity-feedback activity-feedback--error' : 'activity-feedback';
  panel.setAttribute('role', role);
  panel.textContent = message;
  return panel;
}

function createEmptyState(): HTMLElement {
  const panel = document.createElement('section');
  panel.className = 'activity-empty';
  const title = document.createElement('h2');
  title.textContent = 'Le carnet est encore vierge';
  const message = document.createElement('p');
  message.textContent = 'Les prochains ajouts, renommages, archivages et changements détectés apparaîtront ici après une synchronisation complète.';
  panel.append(title, message);
  return panel;
}

function createEvent(
  event: ActivityEvent,
  projects: readonly Project[],
): HTMLElement {
  const target = resolveActivityTarget(event, projects);
  const item = document.createElement('li');
  item.className = `activity-event activity-event--${event.type}`;
  const marker = document.createElement('span');
  marker.className = 'activity-event__marker';
  marker.setAttribute('aria-hidden', 'true');

  const body = document.createElement('article');
  const heading = document.createElement('h4');
  if (target.href) {
    const link = document.createElement('a');
    link.href = target.href;
    link.textContent = target.displayName;
    heading.append(link);
  } else {
    heading.textContent = target.displayName;
  }

  const description = document.createElement('p');
  description.textContent = activityEventLabel(event, target);
  const time = document.createElement('time');
  time.dateTime = event.occurredAt;
  time.textContent = formatRelativeDate(event.occurredAt);
  time.title = formatFullDate(event.occurredAt);
  const fullDate = document.createElement('span');
  fullDate.className = 'visually-hidden';
  fullDate.textContent = `, ${formatFullDate(event.occurredAt)}`;
  time.append(fullDate);
  body.append(heading, description, time);
  item.append(marker, body);
  return item;
}

function createTimeline(
  events: readonly ActivityEvent[],
  projects: readonly Project[],
): HTMLElement {
  const timeline = document.createElement('div');
  timeline.className = 'activity-timeline';

  for (const week of groupActivityEvents(events)) {
    const section = document.createElement('section');
    section.className = 'activity-week';
    const weekTitle = document.createElement('h2');
    weekTitle.textContent = `Semaine du ${RANGE_FORMAT.format(week.start)} au ${RANGE_FORMAT.format(week.end)}`;
    section.append(weekTitle);

    for (const day of week.days) {
      const daySection = document.createElement('section');
      daySection.className = 'activity-day';
      const dayTitle = document.createElement('h3');
      dayTitle.textContent = DAY_FORMAT.format(day.date);
      const list = document.createElement('ol');
      list.className = 'activity-events';
      for (const event of day.events) list.append(createEvent(event, projects));
      daySection.append(dayTitle, list);
      section.append(daySection);
    }
    timeline.append(section);
  }
  return timeline;
}

export function renderActivity(state: AppState | undefined): HTMLElement {
  const view = document.createElement('div');
  view.className = 'activity-view';
  view.append(createHeader());

  const activity = state?.activity ?? INITIAL_ACTIVITY_STATE;
  const events = activity.events;
  const projects = state?.sync.snapshot?.projects ?? [];

  if (state?.sync.status === 'offline') {
    view.append(createStatus('Mode hors ligne : le journal local reste consultable.'));
  }
  if (activity.status === 'loading') {
    view.append(createStatus(events.length > 0
      ? 'Actualisation du journal local. Les événements déjà chargés restent visibles.'
      : 'Ouverture du journal local…'));
  }
  if (activity.status === 'error') {
    view.append(createStatus(
      events.length > 0
        ? `Le journal connu reste visible. ${readableError(activity.error)}`
        : readableError(activity.error),
      events.length > 0 ? 'status' : 'alert',
    ));
  }
  if (activity.invalidCount > 0) {
    view.append(createStatus(
      `${String(activity.invalidCount)} entrée${activity.invalidCount > 1 ? 's locales ont été ignorées' : ' locale a été ignorée'} car leur format était invalide.`,
    ));
  }

  if (events.length === 0) {
    if (activity.status === 'ready') view.append(createEmptyState());
    else if (activity.status === 'idle') view.append(createStatus('Le journal local sera chargé au démarrage.'));
    return view;
  }

  view.append(createTimeline(events, projects));
  return view;
}
