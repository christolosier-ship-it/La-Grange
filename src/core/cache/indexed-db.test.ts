import { describe, expect, it } from 'vitest';
import { activityKeysToPrune } from './indexed-db';

describe('IndexedDB activity retention', () => {
  it('keeps the newest keys inside the configured bound', () => {
    const keys = Array.from({ length: 505 }, (_, index) => index + 1);
    expect(activityKeysToPrune(keys, 500)).toEqual([1, 2, 3, 4, 5]);
    expect(activityKeysToPrune(keys.slice(0, 10), 500)).toEqual([]);
  });
});
