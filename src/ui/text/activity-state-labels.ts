import type { ActivityState } from '../../core/projects/model';

export const SINGULAR_ACTIVITY_STATE_LABELS: Readonly<Record<ActivityState, string>> = {
  active: 'Actif',
  maintenance: 'Maintenance',
  sleeping: 'En sommeil',
  archived: 'Archivé',
};

export const PLURAL_ACTIVITY_STATE_LABELS: Readonly<Record<ActivityState, string>> = {
  active: 'Actifs',
  maintenance: 'Maintenance',
  sleeping: 'En sommeil',
  archived: 'Archivés',
};
