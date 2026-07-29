import { isAbortError } from '../../utils/errors';
import type { ProjectDetailsClient } from '../github/detail-client';
import { mapProjectDetails } from '../projects/detail-mapper';
import type { ProjectDetails } from '../projects/details';
import type { Project } from '../projects/model';

export type ProjectDetailStatus = 'idle' | 'loading-cache' | 'loading' | 'ready' | 'offline' | 'error';

export interface ProjectDetailState {
  readonly projectId: number;
  readonly status: ProjectDetailStatus;
  readonly details?: ProjectDetails;
  readonly error?: Error;
  readonly warning?: Error;
}

export interface ProjectDetailsCache {
  getProjectDetails(projectId: number): Promise<ProjectDetails | undefined>;
  saveProjectDetails(details: ProjectDetails): Promise<void>;
}

export interface ProjectDetailOptions {
  readonly online?: boolean;
  readonly force?: boolean;
}

export type ProjectDetailListener = (state: ProjectDetailState) => void;

export const PROJECT_DETAILS_FRESHNESS_MS = 45 * 60 * 1_000;

function normalizeError(error: unknown, fallback: string): Error {
  return error instanceof Error ? error : new Error(fallback);
}

export class ProjectDetailService {
  private readonly states = new Map<number, ProjectDetailState>();
  private readonly active = new Map<number, Promise<ProjectDetailState>>();
  private readonly controllers = new Map<number, AbortController>();

  constructor(
    private readonly username: string,
    private readonly client: ProjectDetailsClient,
    private readonly cache: ProjectDetailsCache,
    private readonly publish: ProjectDetailListener,
    private readonly now: () => Date = () => new Date(),
    private readonly freshnessMs = PROJECT_DETAILS_FRESHNESS_MS,
  ) {}

  private emit(state: ProjectDetailState): ProjectDetailState {
    this.states.set(state.projectId, state);
    this.publish(state);
    return state;
  }

  private current(projectId: number): ProjectDetailState {
    return this.states.get(projectId) ?? { projectId, status: 'idle' };
  }

  async loadCached(project: Project): Promise<ProjectDetailState> {
    const current = this.current(project.id);
    if (current.details?.repositoryName === project.repositoryName) return current;

    this.emit({ projectId: project.id, status: 'loading-cache', details: current.details });
    try {
      const details = await this.cache.getProjectDetails(project.id);
      if (!details || details.repositoryName !== project.repositoryName) {
        return this.emit({ projectId: project.id, status: 'idle' });
      }
      return this.emit({ projectId: project.id, status: 'ready', details });
    } catch (error) {
      return this.emit({
        projectId: project.id,
        status: 'error',
        details: current.details,
        error: normalizeError(error, 'Project detail cache failed'),
      });
    }
  }

  refresh(project: Project, options: ProjectDetailOptions = {}): Promise<ProjectDetailState> {
    const pending = this.active.get(project.id);
    if (pending) return pending;

    const request = this.runRefresh(project, options).finally(() => {
      this.active.delete(project.id);
      this.controllers.delete(project.id);
    });
    this.active.set(project.id, request);
    return request;
  }

  cancel(projectId?: number): void {
    if (projectId !== undefined) {
      this.controllers.get(projectId)?.abort();
      return;
    }
    for (const controller of this.controllers.values()) controller.abort();
  }

  private async runRefresh(
    project: Project,
    options: ProjectDetailOptions,
  ): Promise<ProjectDetailState> {
    const current = this.current(project.id);
    const cached = current.details?.repositoryName === project.repositoryName
      ? current.details
      : undefined;
    const cacheTime = cached ? Date.parse(cached.fetchedAt) : Number.NaN;
    const fresh = cached !== undefined
      && Number.isFinite(cacheTime)
      && this.now().getTime() - cacheTime < this.freshnessMs;

    if (fresh && !options.force) return this.emit({ projectId: project.id, status: 'ready', details: cached });
    if (options.online === false) {
      return this.emit({ projectId: project.id, status: 'offline', details: cached });
    }

    const controller = new AbortController();
    this.controllers.set(project.id, controller);
    this.emit({ projectId: project.id, status: 'loading', details: cached });

    try {
      const dto = await this.client.fetchProjectDetails(
        this.username,
        project.repositoryName,
        controller.signal,
      );
      const details = mapProjectDetails(project.id, project.repositoryName, dto, this.now());

      try {
        await this.cache.saveProjectDetails(details);
        return this.emit({ projectId: project.id, status: 'ready', details });
      } catch (error) {
        return this.emit({
          projectId: project.id,
          status: 'ready',
          details,
          warning: normalizeError(error, 'Project detail cache write failed'),
        });
      }
    } catch (error) {
      if (isAbortError(error)) {
        return this.emit({
          projectId: project.id,
          status: cached ? 'ready' : 'idle',
          details: cached,
        });
      }
      return this.emit({
        projectId: project.id,
        status: 'error',
        details: cached,
        error: normalizeError(error, 'Project detail request failed'),
      });
    }
  }
}
