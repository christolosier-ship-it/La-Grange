import type { ActivityState, Project } from '../../core/projects/model';

export interface DashboardStatistics {
  readonly total: number;
  readonly active: number;
  readonly launchable: number;
  readonly archived: number;
}

export interface ActivityDistribution {
  readonly active: number;
  readonly maintenance: number;
  readonly sleeping: number;
  readonly archived: number;
}

export interface DashboardModel {
  readonly statistics: DashboardStatistics;
  readonly workbench: readonly Project[];
  readonly readyToLaunch: readonly Project[];
  readonly recentActivity: readonly Project[];
  readonly newArrival?: Project;
  readonly distribution: ActivityDistribution;
}

const WORKBENCH_LIMIT = 6;
const READY_LIMIT = 4;
const RECENT_LIMIT = 5;

function timestamp(value: string | undefined): number {
  const parsed = value ? Date.parse(value) : Number.NaN;
  return Number.isFinite(parsed) ? parsed : 0;
}

function activityTimestamp(project: Project): number {
  return timestamp(project.pushedAt ?? project.updatedAt);
}

function compareRecent(left: Project, right: Project): number {
  return activityTimestamp(right) - activityTimestamp(left)
    || Number(right.featured) - Number(left.featured)
    || (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER)
    || left.displayName.localeCompare(right.displayName, 'fr');
}

function compareReady(left: Project, right: Project): number {
  return Number(right.featured) - Number(left.featured)
    || (left.sortOrder ?? Number.MAX_SAFE_INTEGER) - (right.sortOrder ?? Number.MAX_SAFE_INTEGER)
    || compareRecent(left, right);
}

function emptyDistribution(): Record<ActivityState, number> {
  return { active: 0, maintenance: 0, sleeping: 0, archived: 0 };
}

export function selectDashboard(projects: readonly Project[]): DashboardModel {
  const ordered = [...projects].sort(compareRecent);
  const newArrival = ordered
    .filter((project) => project.isNew)
    .sort((left, right) => timestamp(right.createdAt) - timestamp(left.createdAt) || compareRecent(left, right))[0];

  const reservedIds = new Set<number>();
  if (newArrival) reservedIds.add(newArrival.id);

  const workbench = ordered
    .filter((project) => project.activityState === 'active' && !reservedIds.has(project.id))
    .slice(0, WORKBENCH_LIMIT);
  for (const project of workbench) reservedIds.add(project.id);

  const readyToLaunch = ordered
    .filter((project) => project.appUrl !== undefined && !reservedIds.has(project.id))
    .sort(compareReady)
    .slice(0, READY_LIMIT);

  const distribution = emptyDistribution();
  for (const project of projects) distribution[project.activityState] += 1;

  return {
    statistics: {
      total: projects.length,
      active: distribution.active,
      launchable: projects.filter((project) => project.appUrl !== undefined).length,
      archived: distribution.archived,
    },
    workbench,
    readyToLaunch,
    recentActivity: ordered.slice(0, RECENT_LIMIT),
    newArrival,
    distribution,
  };
}
