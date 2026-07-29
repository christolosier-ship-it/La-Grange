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
) => ProfileSession;

export interface ProfileCoordinatorHooks {
  readonly beforeProfileChange: (username: string) => void;
  readonly afterSynchronization?: (username: string) => Promise<void> | void;
}

export class ProfileCoordinator {
  private session: ProfileSession;

  constructor(
    username: string,
    freshnessMs: number,
    private readonly createSession: ProfileSessionFactory,
    private readonly hooks: ProfileCoordinatorHooks,
  ) {
    this.session = createSession(username, freshnessMs);
  }

  get username(): string {
    return this.session.username;
  }

  async start(online: boolean): Promise<SyncState> {
    await this.session.activity.load(this.session.username);
    const state = await this.session.sync.synchronize({ online });
    await this.refreshActivity();
    return state;
  }

  async switchProfile(
    username: string,
    freshnessMs: number,
    online: boolean,
  ): Promise<SyncState> {
    const cleanUsername = username.trim();
    this.cancelCurrent();
    this.session.activity.reset();
    this.hooks.beforeProfileChange(cleanUsername);
    this.session = this.createSession(cleanUsername, freshnessMs);
    await this.session.activity.load(cleanUsername);
    const state = await this.session.sync.synchronize({ online, force: true });
    await this.refreshActivity();
    return state;
  }

  async updateFreshness(freshnessMs: number, online: boolean): Promise<SyncState> {
    const username = this.session.username;
    this.cancelCurrent();
    this.session = this.createSession(username, freshnessMs);
    const state = await this.session.sync.synchronize({ online });
    await this.refreshActivity();
    return state;
  }

  resetCurrent(freshnessMs: number): void {
    const username = this.session.username;
    this.cancelCurrent();
    this.session.activity.reset();
    this.session = this.createSession(username, freshnessMs);
  }

  async synchronize(options: SyncOptions = {}): Promise<SyncState> {
    const state = await this.session.sync.synchronize(options);
    await this.refreshActivity();
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

  private async refreshActivity(): Promise<void> {
    await this.session.activity.load(this.session.username);
    await this.hooks.afterSynchronization?.(this.session.username);
  }
}
