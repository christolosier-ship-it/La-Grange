export interface GitHubCommitDto {
  readonly sha: string;
  readonly html_url: string;
  readonly commit: {
    readonly message: string;
    readonly author: {
      readonly name: string;
      readonly date: string;
    } | null;
    readonly committer: {
      readonly name: string;
      readonly date: string;
    } | null;
  };
}

export interface GitHubReleaseDto {
  readonly html_url: string;
  readonly name: string | null;
  readonly tag_name: string;
  readonly published_at: string | null;
  readonly created_at: string;
}

export interface GitHubReadmeDto {
  readonly html_url: string;
}

export interface GitHubProjectDetailsDto {
  readonly commits: readonly GitHubCommitDto[];
  readonly release: GitHubReleaseDto | null;
  readonly readme: GitHubReadmeDto | null;
}
