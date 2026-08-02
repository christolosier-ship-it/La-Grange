const STYLES = new Set([
  'lifestyle',
  'games',
  'productivity',
  'health',
  'education',
  'nature',
  'creation',
  'technical',
  'uncategorized',
]);
const HEX_COLOR = /^#[0-9a-f]{6}$/iu;
const REPOSITORY_NAME = /^[A-Za-z0-9._-]{1,100}$/u;
const MAX_COVER_BYTES = 220 * 1024;

export interface ValidatedPatch {
  readonly style: string;
  readonly colors: {
    readonly primary: string;
    readonly secondary: string;
    readonly progress: string;
  };
  readonly progress?: number;
  readonly manualVersion?: string;
  readonly removeCover?: boolean;
}

export interface ValidatedCover {
  readonly bytes: Buffer;
  readonly width: number;
  readonly height: number;
}

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Corps JSON invalide.');
  return value as Record<string, unknown>;
}

function color(value: unknown, name: string): string {
  if (typeof value !== 'string' || !HEX_COLOR.test(value)) throw new Error(`Couleur ${name} invalide.`);
  return value.toLowerCase();
}

export function validateRepositoryName(value: string): string {
  if (!REPOSITORY_NAME.test(value)) throw new Error('Nom de dépôt invalide.');
  return value;
}

export function repositorySlug(value: string): string {
  return validateRepositoryName(value).toLowerCase().replace(/[^a-z0-9]+/gu, '-').replace(/^-|-$/gu, '');
}

export function validatePatch(value: unknown): ValidatedPatch {
  const raw = object(value);
  const allowed = new Set(['style', 'colors', 'progress', 'manualVersion', 'removeCover']);
  for (const key of Object.keys(raw)) {
    if (!allowed.has(key)) throw new Error(`Champ de personnalisation interdit : ${key}.`);
  }
  if (typeof raw.style !== 'string' || !STYLES.has(raw.style)) throw new Error('Style de projet invalide.');
  const colors = object(raw.colors);
  for (const key of Object.keys(colors)) {
    if (!['primary', 'secondary', 'progress'].includes(key)) throw new Error(`Couleur interdite : ${key}.`);
  }
  const patch: ValidatedPatch = {
    style: raw.style,
    colors: {
      primary: color(colors.primary, 'principale'),
      secondary: color(colors.secondary, 'secondaire'),
      progress: color(colors.progress, 'de progression'),
    },
  };
  if (raw.progress !== undefined) {
    if (typeof raw.progress !== 'number' || !Number.isInteger(raw.progress) || raw.progress < 0 || raw.progress > 100) {
      throw new Error('Avancement invalide.');
    }
    Object.assign(patch, { progress: raw.progress });
  }
  if (raw.manualVersion !== undefined) {
    if (typeof raw.manualVersion !== 'string' || !raw.manualVersion.trim() || raw.manualVersion.trim().length > 40) {
      throw new Error('Version manuelle invalide.');
    }
    Object.assign(patch, { manualVersion: raw.manualVersion.trim() });
  }
  if (raw.removeCover !== undefined) {
    if (typeof raw.removeCover !== 'boolean') throw new Error('Instruction de suppression de couverture invalide.');
    Object.assign(patch, { removeCover: raw.removeCover });
  }
  return patch;
}

function uint24(buffer: Buffer, offset: number): number {
  return buffer[offset]! | (buffer[offset + 1]! << 8) | (buffer[offset + 2]! << 16);
}

function webpDimensions(bytes: Buffer): { readonly width: number; readonly height: number } {
  if (bytes.length < 30 || bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error('La couverture n’est pas un WebP valide.');
  }
  const chunk = bytes.toString('ascii', 12, 16);
  if (chunk === 'VP8X') {
    return { width: uint24(bytes, 24) + 1, height: uint24(bytes, 27) + 1 };
  }
  if (chunk === 'VP8L') {
    if (bytes[20] !== 0x2f) throw new Error('En-tête WebP lossless invalide.');
    const bits = bytes.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >>> 14) & 0x3fff) + 1 };
  }
  if (chunk === 'VP8 ') {
    if (bytes[23] !== 0x9d || bytes[24] !== 0x01 || bytes[25] !== 0x2a) {
      throw new Error('En-tête WebP lossy invalide.');
    }
    return {
      width: bytes.readUInt16LE(26) & 0x3fff,
      height: bytes.readUInt16LE(28) & 0x3fff,
    };
  }
  throw new Error('Sous-format WebP non pris en charge.');
}

export function validateCover(value: unknown): ValidatedCover | undefined {
  if (value === undefined) return undefined;
  const raw = object(value);
  if (raw.mimeType !== 'image/webp' || raw.width !== 640 || raw.height !== 400 || typeof raw.base64 !== 'string') {
    throw new Error('Contrat de couverture invalide.');
  }
  const bytes = Buffer.from(raw.base64, 'base64');
  if (bytes.length === 0 || bytes.length > MAX_COVER_BYTES) throw new Error('Poids de couverture invalide.');
  const dimensions = webpDimensions(bytes);
  if (dimensions.width !== 640 || dimensions.height !== 400) throw new Error('La couverture doit mesurer 640 × 400 px.');
  return { bytes, ...dimensions };
}

export function validateRequest(value: unknown): {
  readonly patch: ValidatedPatch;
  readonly cover?: ValidatedCover;
} {
  const raw = object(value);
  for (const key of Object.keys(raw)) {
    if (!['patch', 'cover'].includes(key)) throw new Error(`Champ de requête interdit : ${key}.`);
  }
  return { patch: validatePatch(raw.patch), cover: validateCover(raw.cover) };
}
