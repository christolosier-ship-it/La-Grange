export interface ProjectCommit {
  readonly sha: string;
  readonly message: string;
  readonly authorName: string;
  readonly committedAt: string;
  readonly url: string;
}

export interface ProjectRelease {
  readonly name: string;
  readonly tagName: string;
  readonly publishedAt?: string;
  readonly url: string;
}

export interface ProjectDetails {
  readonly schemaVersion: 1;
  readonly projectId: number;
  readonly repositoryName: string;
  readonly fetchedAt: string;
  readonly commits: readonly ProjectCommit[];
  readonly release?: ProjectRelease;
  readonly readmeAvailable: boolean;
  readonly readmeUrl?: string;
}
