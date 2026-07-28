export type RouteName = 'dashboard' | 'projects' | 'project' | 'activity' | 'settings' | 'not-found';

export interface RouteMatch {
  readonly name: RouteName;
  readonly params: Readonly<Record<string, string>>;
  readonly query: URLSearchParams;
}

const STATIC_ROUTES = new Map<string, RouteName>([
  ['/', 'dashboard'],
  ['/projects', 'projects'],
  ['/activity', 'activity'],
  ['/settings', 'settings'],
]);

export function matchRoute(hash: string): RouteMatch {
  const fragment = hash.replace(/^#/, '') || '/';
  const [rawPath = '/', rawQuery = ''] = fragment.split('?', 2);
  const path = normalizePath(rawPath);
  const query = new URLSearchParams(rawQuery);
  const staticName = STATIC_ROUTES.get(path);

  if (staticName) return { name: staticName, params: {}, query };

  const projectMatch = /^\/project\/([^/]+)$/.exec(path);
  if (projectMatch?.[1]) {
    try {
      const repositoryName = decodeURIComponent(projectMatch[1]);
      if (repositoryName.trim() && !repositoryName.includes('/')) {
        return { name: 'project', params: { repositoryName }, query };
      }
    } catch {
      // A malformed URL is treated as an unknown route.
    }
  }

  return { name: 'not-found', params: {}, query };
}

function normalizePath(rawPath: string): string {
  const prefixedPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const compactPath = prefixedPath.replace(/\/{2,}/g, '/');
  return compactPath.length > 1 ? compactPath.replace(/\/$/, '') : compactPath;
}
