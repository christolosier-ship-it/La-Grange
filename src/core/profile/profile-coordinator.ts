import type { ProjectDetailOptions, ProjectDetailState } from '../details/project-detail-service';
import type { Project } from '../projects/model';
import type { SyncOptions, SyncState } from '../sync/sync-service';

export interface ProfileSyncSession {
  synchronize(options?: SyncOptions): Promise<SyncState>;
  acknowledgeProject(repositoryName: string): Promise<SyncState>;
  cancel(): void;
}

export interface ProfileDetailSession {
  loadCached(project: Project): Promise<ProjectDetailState>;
  refresh(project: Project, options?: ProjectDetailOptions): Promise<ProjectDetailState>;
  cancel(projectId?: number): void;
}

export interface ProfileActivitySession {
  load(username: string): Promise<unknown>;
  reset(): unknown;
}

export interface ProfileSession {
  readonly username: string;
  readonly sync: ProfileSyncSession;
  readonly details: ProfileDetailSession;
  readonly activity: ProfileActivitySession;
}

export type ProfileSessionFactory = (
  username: string,
  freshnessMs: number,
  generation: number,
) => ProfileSession;

export interface ProfileCoordinatorHooks {
  readonly beforeProfileChange: (username: string) => void;
  readonly afterSynchronization?: (username: string) => Promise<void> | void;
}

export class ProfileCoordinator {
  private session: ProfileSession;
  private generation = 0;

  constructor(
    username: string,
    freshnessMs: number,
    private readonly createSession: ProfileSessionFactory,
    private readonly hooks: ProfileCoordinatorHooks,
  ) {
    this.session = createSession(username, freshnessMs, this.generation);
  }

  get username(): string {
    return this.session.username;
  }

  isCurrentGeneration(generation: number): boolean {
    return generation === this.generation;
  }

  async start(online: boolean): Promise<SyncState> {
    const generation = this.generation;
    await this.session.activity.load(this.session.username);
    const state = await this.session.sync.synchronize({ online });
    if (this.isCurrentGeneration(generation)) await this.refreshActivity(generation);
    return state;
  }

  async switchProfile(
    username: string,
    freshnessMs: number,
    online: boolean,
  ): Promise<SyncState> {
    const cleanUsername = username.trim();
    this.replaceSession(cleanUsername, freshnessMs, true);
    const generation = this.generation;
    await this.session.activity.load(cleanUsername);
    const state = await this.session.sync.synchronize({ online, force: true });
    if (this.isCurrentGeneration(generation)) await this.refreshActivity(generation);
    return state;
  }

  async updateFreshness(freshnessMs: number, online: boolean): Promise<SyncState> {
    const username = this.session.username;
    this.replaceSession(username, freshnessMs, false);
    const generation = this.generation;
    const state = await this.session.sync.synchronize({ online });
    if (this.isCurrentGeneration(generation)) await this.refreshActivity(generation);
    return state;
  }

  resetCurrent(freshnessMs: number): void {
    this.replaceSession(this.session.username, freshnessMs, false);
  }

  async synchronize(options: SyncOptions = {}): Promise<SyncState> {
    const generation = this.generation;
    const state = await this.session.sync.synchronize(options);
    if (this.isCurrentGeneration(generation)) await this.refreshActivity(generation);
    return state;
  }

  acknowledgeProject(repositoryName: string): Promise<SyncState> {
    return this.session.sync.acknowledgeProject(repositoryName);
  }

  loadProjectDetails(project: Project): Promise<ProjectDetailState> {
    return this.session.details.loadCached(project);
  }

  refreshProjectDetails(
    project: Project,
    options: ProjectDetailOptions,
  ): Promise<ProjectDetailState> {
    return this.session.details.refresh(project, options);
  }

  cancelProjectDetails(projectId?: number): void {
    this.session.details.cancel(projectId);
  }

  cancelCurrent(): void {
    this.session.sync.cancel();
    this.session.details.cancel();
  }

  private replaceSession(username: string, freshnessMs: number, clearProfile: boolean): void {
    this.cancelCurrent();
    this.session.activity.reset();
    this.generation += 1;
    if (clearProfile) this.hooks.beforeProfileChange(username);
    this.session = this.createSession(username, freshnessMs, this.generation);
  }

  private async refreshActivity(generation: number): Promise<void> {
    if (!this.isCurrentGeneration(generation)) return;
    await this.session.activity.load(this.session.username);
    if (!this.isCurrentGeneration(generation)) return;
    await this.hooks.afterSynchronization?.(this.session.username);
  }
}
