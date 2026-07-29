export interface GitHubRepositoryDto {
  readonly id: number;
  readonly node_id?: string;
  readonly name: string;
  readonly description: string | null;
  readonly html_url: string;
  readonly homepage: string | null;
  readonly fork: boolean;
  readonly archived: boolean;
  readonly language: string | null;
  readonly default_branch: string;
  readonly topics: readonly string[];
  readonly open_issues_count: number;
  readonly created_at: string;
  readonly updated_at: string;
  readonly pushed_at: string | null;
}

export type RepositoryFetchResult =
  | { readonly status: 'not-modified'; readonly etag?: string }
  | { readonly status: 'success'; readonly repositories: readonly GitHubRepositoryDto[]; readonly etag?: string };
