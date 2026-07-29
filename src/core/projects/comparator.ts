import type { ActivityEvent, Project } from './model';

export interface Comparison { readonly projects: Project[]; readonly events: ActivityEvent[]; readonly removedIds: number[] }

export function compareProjects(previous: readonly Project[] | undefined, incoming: readonly Project[], username: string, now: string): Comparison {
  const oldById = new Map(previous?.map((project) => [project.id, project]));
  const firstImport = previous === undefined;
  const events: ActivityEvent[] = [];
  const projects = incoming.map((project) => {
    const old = oldById.get(project.id);
    if (!old && !firstImport) events.push({ username, projectId: project.id, type: 'added', occurredAt: now });
    if (old?.repositoryName !== undefined && old.repositoryName !== project.repositoryName) events.push({ username, projectId: project.id, type: 'renamed', occurredAt: now, detail: `${old.repositoryName} → ${project.repositoryName}` });
    if (old && !old.archived && project.archived) events.push({ username, projectId: project.id, type: 'archived', occurredAt: now });
    if (old && old.appUrl !== project.appUrl) events.push({ username, projectId: project.id, type: 'app-url-changed', occurredAt: now });
    return { ...project, isNew: old?.isNew === true || (!old && !firstImport) };
  });
  const ids = new Set(incoming.map(({ id }) => id));
  return { projects, events, removedIds: previous?.filter(({ id }) => !ids.has(id)).map(({ id }) => id) ?? [] };
}
