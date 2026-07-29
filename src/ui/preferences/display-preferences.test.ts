import { describe, expect, it, vi } from 'vitest';
import { DEFAULT_APP_PREFERENCES } from '../../core/preferences/app-preferences';
import { createDisplayPreferenceController } from './display-preferences';

function mediaQuery(initial = false): MediaQueryList {
  let listener: (() => void) | undefined;
  return {
    matches: initial,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: vi.fn((_type: string, callback: EventListenerOrEventListenerObject) => {
      listener = typeof callback === 'function' ? () => callback(new Event('change')) : undefined;
    }),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => {
      listener?.();
      return true;
    }),
  };
}

describe('display preference controller', () => {
  it('applies density and user motion preference on the root element', () => {
    const root = document.createElement('div');
    const query = mediaQuery(false);
    const controller = createDisplayPreferenceController(root, query);

    controller.apply({
      ...DEFAULT_APP_PREFERENCES,
      density: 'compact',
      reduceMotion: true,
    });

    expect(root.dataset.density).toBe('compact');
    expect(root.dataset.reduceMotion).toBe('true');
    controller.stop();
    expect(query.removeEventListener).toHaveBeenCalledOnce();
  });

  it('never enables motion when the system requests reduction', () => {
    const root = document.createElement('div');
    const controller = createDisplayPreferenceController(root, mediaQuery(true));

    controller.apply({ ...DEFAULT_APP_PREFERENCES, reduceMotion: false });

    expect(root.dataset.reduceMotion).toBe('true');
  });
});
