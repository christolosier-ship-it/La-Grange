import { describe, expect, it, vi } from 'vitest';
import { AppError } from '../errors/app-error';
import type { ActivityEvent } from '../projects/model';
import { ActivityService } from './activity-service';

const storedEvent: ActivityEvent = {
  id: 1,
  username: 'example',
  projectId: 42,
  type: 'added',
  occurredAt: '2026-07-29T10:00:00.000Z',
};

describe('ActivityService', () => {
  it('publishes loading then a validated local result', async () => {
    const publish = vi.fn();
    const cache = {
      getActivityEvents: vi.fn().mockResolvedValue({ events: [storedEvent], invalidCount: 2 }),
    };
    const service = new ActivityService(cache, publish);

    const state = await service.load(' example ');

    expect(cache.getActivityEvents).toHaveBeenCalledWith('example');
    expect(publish.mock.calls[0]?.[0]).toMatchObject({ status: 'loading', username: 'example' });
    expect(state).toMatchObject({
      status: 'ready',
      username: 'example',
      events: [storedEvent],
      invalidCount: 2,
    });
  });

  it('preserves already loaded events when IndexedDB becomes unavailable', async () => {
    const publish = vi.fn();
    const cache = {
      getActivityEvents: vi.fn()
        .mockResolvedValueOnce({ events: [storedEvent], invalidCount: 0 })
        .mockRejectedValueOnce(new AppError('cache', 'IDB blocked', 'Journal local indisponible.', true)),
    };
    const service = new ActivityService(cache, publish);
    await service.load('example');

    const state = await service.load('example');

    expect(state.status).toBe('error');
    expect(state.events).toEqual([storedEvent]);
    expect(state.error).toBeInstanceOf(AppError);
  });

  it('ignores a stale read completed after a newer profile request', async () => {
    let resolveFirst: ((value: { events: ActivityEvent[]; invalidCount: number }) => void) | undefined;
    const first = new Promise<{ events: ActivityEvent[]; invalidCount: number }>((resolve) => {
      resolveFirst = resolve;
    });
    const cache = {
      getActivityEvents: vi.fn()
        .mockReturnValueOnce(first)
        .mockResolvedValueOnce({ events: [], invalidCount: 0 }),
    };
    const service = new ActivityService(cache, vi.fn());
    const oldLoad = service.load('old-user');
    const newState = await service.load('new-user');
    resolveFirst?.({ events: [storedEvent], invalidCount: 0 });
    await oldLoad;

    expect(newState).toMatchObject({ status: 'ready', username: 'new-user', events: [] });
  });
});
