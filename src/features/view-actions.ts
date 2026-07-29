import type { Project } from '../core/projects/model';
import type { CatalogueState } from './catalogue/catalogue-model';

export interface ViewActions {
  readonly onCatalogueChange?: (state: CatalogueState) => void;
  readonly onToggleFavorite?: (projectId: number) => void;
  readonly onProjectDetailsRequest?: (project: Project, force: boolean) => void;
}
