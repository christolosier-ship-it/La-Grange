import { describe, expect, it } from 'vitest';
import { matchRoute } from './routes';

describe('matchRoute', () => {
  it.each([['', 'dashboard'], ['#/', 'dashboard'], ['#/projects', 'projects'], ['#/activity', 'activity'], ['#/settings', 'settings']])('maps %s to %s', (hash, name) => {
    expect(matchRoute(hash).name).toBe(name);
  });
  it('decodes a repository name and keeps the query', () => {
    const route = matchRoute('#/project/Mon%20Projet?from=dashboard');
    expect(route.name).toBe('project');
    expect(route.params.repositoryName).toBe('Mon Projet');
    expect(route.query.get('from')).toBe('dashboard');
  });
  it.each(['#/unknown', '#/project/', '#/project/%E0%A4%A'])('returns not-found for %s', (hash) => {
    expect(matchRoute(hash).name).toBe('not-found');
  });
});
