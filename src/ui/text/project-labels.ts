import type { ProjectCategory } from '../../core/projects/model';

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  games: 'Jeux',
  applications: 'Applications',
  'professional-tools': 'Outils professionnels',
  experiments: 'Expériences',
  learning: 'Apprentissage',
  uncategorized: 'Sans catégorie',
};
