import { describe, expect, it, vi } from 'vitest';
import type { ProfileSession } from './profile-coordinator';
import { ProfileCoordinator } from './profile-coordinator';

function session(username: string): ProfileSession {
  return {
    username,
    sync: {
      synchronize: vi.fn().mockResolvedValue({ status: 'ready' }),
      acknowledgeProject: vi.fn().mockResolvedValue({ status: 'ready' }),
      cancel: vi.fn(),
    },
    details: {
      loadCached: vi.fn(),
      refresh: vi.fn(),
      cancel: vi.fn(),
    },
    activity: {
      load: vi.fn().mockResolvedValue(undefined),
      reset: vi.fn(),
    },
  };
}

describe('ProfileCoordinator', () => {
  it('loads local data then synchronizes the initial profile', async () => {
    const current = session('first-user');
    const factory = vi.fn().mockReturnValue(current);
    const afterSynchronization = vi.fn();
    const coordinator = new ProfileCoordinator('first-user', 900_000, factory, {
      beforeProfileChange: vi.fn(),
      afterSynchronization,
    });

    await coordinator.start(false);

    expect(current.activity.load).toHaveBeenNthCalledWith(1, 'first-user');
    expect(current.sync.synchronize).toHaveBeenCalledWith({ online: false });
    expect(current.activity.load).toHaveBeenCalledTimes(2);
    expect(afterSynchronization).toHaveBeenCalledWith('first-user');
  });

  it('cancels the old session and clears memory before loading a distinct profile', async () => {
    const first = session('first-user');
    const second = session('second-user');
    const factory = vi.fn()
      .mockReturnValueOnce(first)
      .mockReturnValueOnce(second);
    const beforeProfileChange = vi.fn();
    const coordinator = new ProfileCoordinator('first-user', 900_000, factory, {
      beforeProfileChange,
    });

    await coordinator.switchProfile('second-user', 1_800_000, true);

    expect(first.sync.cancel).toHaveBeenCalledOnce();
    expect(first.details.cancel).toHaveBeenCalledOnce();
    expect(first.activity.reset).toHaveBeenCalledOnce();
    expect(beforeProfileChange).toHaveBeenCalledWith('second-user');
    expect(factory).toHaveBeenLastCalledWith('second-user', 1_800_000);
    expect(second.activity.load).toHaveBeenNthCalledWith(1, 'second-user');
    expect(second.sync.synchronize).toHaveBeenCalledWith({ online: true, force: true });
    expect(coordinator.username).toBe('second-user');
  });

  it('rebuilds freshness without clearing the active profile state', async () => {
    const first = session('same-user');
    const rebuilt = session('same-user');
    const factory = vi.fn()
      .mockReturnValueOnce(first)
      .mockReturnValueOnce(rebuilt);
    const beforeProfileChange = vi.fn();
    const coordinator = new ProfileCoordinator('same-user', 900_000, factory, {
      beforeProfileChange,
    });

    await coordinator.updateFreshness(3_600_000, true);

    expect(first.sync.cancel).toHaveBeenCalledOnce();
    expect(first.details.cancel).toHaveBeenCalledOnce();
    expect(beforeProfileChange).not.toHaveBeenCalled();
    expect(rebuilt.sync.synchronize).toHaveBeenCalledWith({ online: true });
  });
});
