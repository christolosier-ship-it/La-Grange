import { describe, expect, it, vi, type Mock } from 'vitest';
import type { ProfileSession } from './profile-coordinator';
import { ProfileCoordinator } from './profile-coordinator';

interface SessionFixture {
  readonly value: ProfileSession;
  readonly synchronize: Mock;
  readonly cancelSync: Mock;
  readonly cancelDetails: Mock;
  readonly loadActivity: Mock;
  readonly resetActivity: Mock;
}

function session(username: string): SessionFixture {
  const synchronize = vi.fn().mockResolvedValue({ status: 'ready' });
  const cancelSync = vi.fn();
  const cancelDetails = vi.fn();
  const loadActivity = vi.fn().mockResolvedValue(undefined);
  const resetActivity = vi.fn();
  return {
    synchronize,
    cancelSync,
    cancelDetails,
    loadActivity,
    resetActivity,
    value: {
      username,
      sync: {
        synchronize,
        acknowledgeProject: vi.fn().mockResolvedValue({ status: 'ready' }),
        cancel: cancelSync,
      },
      details: {
        loadCached: vi.fn(),
        refresh: vi.fn(),
        cancel: cancelDetails,
      },
      activity: {
        load: loadActivity,
        reset: resetActivity,
      },
    },
  };
}

describe('ProfileCoordinator', () => {
  it('loads local data then synchronizes the initial profile', async () => {
    const current = session('first-user');
    const factory = vi.fn().mockReturnValue(current.value);
    const afterSynchronization = vi.fn();
    const coordinator = new ProfileCoordinator('first-user', 900_000, factory, {
      beforeProfileChange: vi.fn(),
      afterSynchronization,
    });

    await coordinator.start(false);

    expect(current.loadActivity).toHaveBeenNthCalledWith(1, 'first-user');
    expect(current.synchronize).toHaveBeenCalledWith({ online: false });
    expect(current.loadActivity).toHaveBeenCalledTimes(2);
    expect(afterSynchronization).toHaveBeenCalledWith('first-user');
  });

  it('cancels the old session and clears memory before loading a distinct profile', async () => {
    const first = session('first-user');
    const second = session('second-user');
    const factory = vi.fn()
      .mockReturnValueOnce(first.value)
      .mockReturnValueOnce(second.value);
    const beforeProfileChange = vi.fn();
    const coordinator = new ProfileCoordinator('first-user', 900_000, factory, {
      beforeProfileChange,
    });

    await coordinator.switchProfile('second-user', 1_800_000, true);

    expect(first.cancelSync).toHaveBeenCalledOnce();
    expect(first.cancelDetails).toHaveBeenCalledOnce();
    expect(first.resetActivity).toHaveBeenCalledOnce();
    expect(beforeProfileChange).toHaveBeenCalledWith('second-user');
    expect(factory).toHaveBeenLastCalledWith('second-user', 1_800_000);
    expect(second.loadActivity).toHaveBeenNthCalledWith(1, 'second-user');
    expect(second.synchronize).toHaveBeenCalledWith({ online: true, force: true });
    expect(coordinator.username).toBe('second-user');
  });

  it('rebuilds freshness without clearing the active profile state', async () => {
    const first = session('same-user');
    const rebuilt = session('same-user');
    const factory = vi.fn()
      .mockReturnValueOnce(first.value)
      .mockReturnValueOnce(rebuilt.value);
    const beforeProfileChange = vi.fn();
    const coordinator = new ProfileCoordinator('same-user', 900_000, factory, {
      beforeProfileChange,
    });

    await coordinator.updateFreshness(3_600_000, true);

    expect(first.cancelSync).toHaveBeenCalledOnce();
    expect(first.cancelDetails).toHaveBeenCalledOnce();
    expect(beforeProfileChange).not.toHaveBeenCalled();
    expect(rebuilt.synchronize).toHaveBeenCalledWith({ online: true });
  });

  it('rebuilds an empty session after cache reset without an automatic request', () => {
    const first = session('same-user');
    const rebuilt = session('same-user');
    const factory = vi.fn()
      .mockReturnValueOnce(first.value)
      .mockReturnValueOnce(rebuilt.value);
    const coordinator = new ProfileCoordinator('same-user', 900_000, factory, {
      beforeProfileChange: vi.fn(),
    });

    coordinator.resetCurrent(1_800_000);

    expect(first.cancelSync).toHaveBeenCalledOnce();
    expect(first.cancelDetails).toHaveBeenCalledOnce();
    expect(first.resetActivity).toHaveBeenCalledOnce();
    expect(factory).toHaveBeenLastCalledWith('same-user', 1_800_000);
    expect(rebuilt.synchronize).not.toHaveBeenCalled();
    expect(rebuilt.loadActivity).not.toHaveBeenCalled();
    expect(coordinator.username).toBe('same-user');
  });
});
