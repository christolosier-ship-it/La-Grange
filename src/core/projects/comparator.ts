import type { ActivityEvent, Project } from './model';

export interface Comparison {
  readonly projects: Project[];
  readonly events: ActivityEvent[];
  readonly removedIds: number[];
  readonly aliases: Readonly<Record<string, number>>;
}

export function compareProjects(
  previous: readonly Project[] | undefined,
  incoming: readonly Project[],
  username: string,
  now: string,
  previousAliases: Readonly<Record<string, number>> = {},
): Comparison {
  const oldById = new Map(previous?.map((project) => [project.id, project]));
  const firstImport = previous === undefined;
  const events: ActivityEvent[] = [];
  const aliases: Record<string, number> = { ...previousAliases };

  const projects = incoming.map((project) => {
    const old = oldById.get(project.id);

    if (!old && !firstImport) {
      events.push({ username, projectId: project.id, type: 'added', occurredAt: now });
    }
    if (old && old.repositoryName !== project.repositoryName) {
      events.push({
        username,
        projectId: project.id,
        type: 'renamed',
        occurredAt: now,
        detail: `${old.repositoryName} → ${project.repositoryName}`,
      });
      aliases[old.repositoryName] = project.id;
    }
    if (old && !old.archived && project.archived) {
      events.push({ username, projectId: project.id, type: 'archived', occurredAt: now });
    }
    if (old && old.appUrl !== project.appUrl) {
      events.push({ username, projectId: project.id, type: 'app-url-changed', occurredAt: now });
    }

    return {
      ...project,
      isNew: old?.isNew === true || (!old && !firstImport),
    };
  });

  const incomingIds = new Set(incoming.map(({ id }) => id));
  const removed = previous?.filter(({ id }) => !incomingIds.has(id)) ?? [];

  for (const project of removed) {
    events.push({
      username,
      projectId: project.id,
      type: 'removed',
      occurredAt: now,
      detail: project.repositoryName,
    });
  }

  for (const [name, projectId] of Object.entries(aliases)) {
    if (!incomingIds.has(projectId)) delete aliases[name];
  }
  for (const project of projects) delete aliases[project.repositoryName];

  return {
    projects,
    events,
    removedIds: removed.map(({ id }) => id),
    aliases,
  };
}
