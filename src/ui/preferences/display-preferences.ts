import {
  effectiveReducedMotion,
  type AppPreferences,
} from '../../core/preferences/app-preferences';

export interface DisplayPreferenceController {
  apply(preferences: AppPreferences): void;
  stop(): void;
}

export function createDisplayPreferenceController(
  root: HTMLElement = document.documentElement,
  mediaQuery: MediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)'),
): DisplayPreferenceController {
  let current: AppPreferences | undefined;
  const render = (): void => {
    if (!current) return;
    root.dataset.density = current.density;
    root.dataset.reduceMotion = String(effectiveReducedMotion(current.reduceMotion, mediaQuery.matches));
  };
  const onSystemMotionChange = (): void => {
    render();
  };
  mediaQuery.addEventListener('change', onSystemMotionChange);

  return {
    apply: (preferences): void => {
      current = preferences;
      render();
    },
    stop: (): void => {
      mediaQuery.removeEventListener('change', onSystemMotionChange);
    },
  };
}
