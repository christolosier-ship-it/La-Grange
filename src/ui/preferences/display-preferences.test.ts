import { describe, expect, it, vi, type Mock } from 'vitest';
import { DEFAULT_APP_PREFERENCES } from '../../core/preferences/app-preferences';
import { createDisplayPreferenceController } from './display-preferences';

function mediaQuery(initial = false): { query: MediaQueryList; remove: Mock } {
  let listener: (() => void) | undefined;
  const remove = vi.fn();
  const query: MediaQueryList = {
    matches: initial,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: vi.fn((_type: string, callback: EventListenerOrEventListenerObject) => {
      listener = typeof callback === 'function'
        ? () => {
            callback(new Event('change'));
          }
        : undefined;
    }),
    removeEventListener: remove,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => {
      listener?.();
      return true;
    }),
  };
  return { query, remove };
}

describe('display preference controller', () => {
  it('applies density and user motion preference on the root element', () => {
    const root = document.createElement('div');
    const { query, remove } = mediaQuery(false);
    const controller = createDisplayPreferenceController(root, query);

    controller.apply({
      ...DEFAULT_APP_PREFERENCES,
      density: 'compact',
      reduceMotion: true,
    });

    expect(root.dataset.density).toBe('compact');
    expect(root.dataset.reduceMotion).toBe('true');
    controller.stop();
    expect(remove).toHaveBeenCalledOnce();
  });

  it('never enables motion when the system requests reduction', () => {
    const root = document.createElement('div');
    const { query } = mediaQuery(true);
    const controller = createDisplayPreferenceController(root, query);

    controller.apply({ ...DEFAULT_APP_PREFERENCES, reduceMotion: false });

    expect(root.dataset.reduceMotion).toBe('true');
  });
});
