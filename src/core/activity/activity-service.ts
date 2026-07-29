import type { ActivityReadResult } from './activity-model';

export type ActivityStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface ActivityState {
  readonly status: ActivityStatus;
  readonly username?: string;
  readonly events: ActivityReadResult['events'];
  readonly invalidCount: number;
  readonly error?: Error;
}

export interface ActivityCache {
  getActivityEvents(username: string): Promise<ActivityReadResult>;
}

export type ActivityListener = (state: ActivityState) => void;

export const INITIAL_ACTIVITY_STATE: ActivityState = {
  status: 'idle',
  events: [],
  invalidCount: 0,
};

export class ActivityService {
  private requestId = 0;
  private state: ActivityState = INITIAL_ACTIVITY_STATE;

  constructor(
    private readonly cache: ActivityCache,
    private readonly publish: ActivityListener,
  ) {}

  async load(username: string): Promise<ActivityState> {
    const cleanUsername = username.trim();
    const currentRequest = ++this.requestId;
    this.emit({
      ...this.state,
      status: 'loading',
      username: cleanUsername,
      error: undefined,
    });

    try {
      const result = await this.cache.getActivityEvents(cleanUsername);
      if (currentRequest !== this.requestId) return this.state;
      return this.emit({
        status: 'ready',
        username: cleanUsername,
        events: result.events,
        invalidCount: result.invalidCount,
      });
    } catch (error) {
      if (currentRequest !== this.requestId) return this.state;
      return this.emit({
        ...this.state,
        status: 'error',
        username: cleanUsername,
        error: error instanceof Error ? error : new Error('Activity cache failure'),
      });
    }
  }

  reset(): ActivityState {
    this.requestId += 1;
    return this.emit(INITIAL_ACTIVITY_STATE);
  }

  private emit(state: ActivityState): ActivityState {
    this.state = state;
    this.publish(state);
    return state;
  }
}
