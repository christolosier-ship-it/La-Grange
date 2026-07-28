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
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const staticName = STATIC_ROUTES.get(path);

  if (staticName) return { name: staticName, params: {}, query: new URLSearchParams(rawQuery) };

  const projectMatch = /^\/project\/([^/]+)$/.exec(path);
  if (projectMatch?.[1]) {
    try {
      const repositoryName = decodeURIComponent(projectMatch[1]);
      if (repositoryName.trim()) {
        return { name: 'project', params: { repositoryName }, query: new URLSearchParams(rawQuery) };
      }
    } catch {
      // A malformed URL is treated as an unknown route.
    }
  }

  return { name: 'not-found', params: {}, query: new URLSearchParams(rawQuery) };
}
