import type { ProjectOverride, ProjectOverrides } from './overrides';

const OVERRIDE_FIELDS: ReadonlyArray<keyof ProjectOverride> = [
  'displayName',
  'description',
  'category',
  'cover',
  'logo',
  'accent',
  'featured',
  'appUrl',
  'hidden',
  'sortOrder',
];

export function overridesSignature(overrides: ProjectOverrides): string {
  const normalized = Object.keys(overrides)
    .sort((left, right) => left.localeCompare(right, 'en'))
    .map((repositoryName) => {
      const override = overrides[repositoryName] ?? {};
      const fields = OVERRIDE_FIELDS.flatMap((field) => (
        override[field] === undefined ? [] : [[field, override[field]]]
      ));
      return [repositoryName, fields];
    });

  return JSON.stringify(normalized);
}
