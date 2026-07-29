import { describe, expect, it, vi } from 'vitest';
import { AppError } from '../errors/app-error';
import { CacheMaintenanceService } from './cache-maintenance';

const diagnostics = {
  username: 'example',
  available: true,
  snapshotPresent: true,
  projectCount: 12,
  activityCount: 7,
  invalidActivityCount: 1,
  detailCount: 3,
};

describe('CacheMaintenanceService', () => {
  it('publishes real cache diagnostics', async () => {
    const publish = vi.fn();
    const cache = {
      inspectProfileCache: vi.fn().mockResolvedValue(diagnostics),
      resetProfileCache: vi.fn(),
    };
    const service = new CacheMaintenanceService(cache, publish);

    const state = await service.inspect(' example ');

    expect(cache.inspectProfileCache).toHaveBeenCalledWith('example');
    expect(publish.mock.calls[0]?.[0]).toMatchObject({ status: 'loading' });
    expect(state).toEqual({ status: 'ready', username: 'example', cache: diagnostics });
  });

  it('resets only through the cache API then publishes the empty inspection', async () => {
    const cache = {
      inspectProfileCache: vi.fn().mockResolvedValue({
        ...diagnostics,
        snapshotPresent: false,
        projectCount: 0,
        activityCount: 0,
        detailCount: 0,
      }),
      resetProfileCache: vi.fn().mockResolvedValue({
        username: 'example',
        snapshotDeleted: true,
        activityDeleted: 7,
        detailsDeleted: 3,
      }),
    };
    const publish = vi.fn();
    const service = new CacheMaintenanceService(cache, publish);

    const result = await service.reset('example');

    expect(result).toMatchObject({ snapshotDeleted: true, activityDeleted: 7, detailsDeleted: 3 });
    expect(cache.resetProfileCache).toHaveBeenCalledOnce();
    expect(publish.mock.lastCall?.[0]).toMatchObject({
      status: 'ready',
      message: expect.stringContaining('préférences sont conservées'),
    });
  });

  it('keeps a user-facing cache error without claiming success', async () => {
    const error = new AppError('cache', 'IDB blocked', 'Cache local indisponible.', true);
    const cache = {
      inspectProfileCache: vi.fn().mockRejectedValue(error),
      resetProfileCache: vi.fn(),
    };
    const service = new CacheMaintenanceService(cache, vi.fn());

    const state = await service.inspect('example');

    expect(state).toMatchObject({ status: 'error', error });
  });
});
