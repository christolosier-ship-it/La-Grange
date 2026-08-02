import { describe, expect, it } from 'vitest';
import {
  repositorySlug,
  validateCover,
  validatePatch,
  validateRequest,
} from './customization-validation';

function webp640x400(): string {
  const bytes = Buffer.alloc(30);
  bytes.write('RIFF', 0, 'ascii');
  bytes.writeUInt32LE(22, 4);
  bytes.write('WEBP', 8, 'ascii');
  bytes.write('VP8X', 12, 'ascii');
  bytes.writeUInt32LE(10, 16);
  bytes.writeUIntLE(639, 24, 3);
  bytes.writeUIntLE(399, 27, 3);
  return bytes.toString('base64');
}

describe('customization validation', () => {
  it('accepts only the documented style, colors and optional fields', () => {
    expect(validatePatch({
      style: 'nature',
      colors: {
        primary: '#234F29',
        secondary: '#9FC486',
        progress: '#4B8A53',
      },
      progress: 48,
      manualVersion: 'v1.2.0',
      removeCover: false,
    })).toEqual({
      style: 'nature',
      colors: {
        primary: '#234f29',
        secondary: '#9fc486',
        progress: '#4b8a53',
      },
      progress: 48,
      manualVersion: 'v1.2.0',
      removeCover: false,
    });
  });

  it('rejects unexpected fields and invalid progress', () => {
    expect(() => validatePatch({
      style: 'nature',
      colors: { primary: '#234f29', secondary: '#9fc486', progress: '#4b8a53' },
      progress: 120,
    })).toThrow('Avancement invalide');
    expect(() => validateRequest({ patch: {}, repository: 'other' })).toThrow('interdit');
  });

  it('checks the real WebP dimensions instead of trusting JSON metadata', () => {
    const cover = validateCover({
      mimeType: 'image/webp',
      base64: webp640x400(),
      width: 640,
      height: 400,
    });
    expect(cover?.width).toBe(640);
    expect(cover?.height).toBe(400);

    const invalid = Buffer.from(webp640x400(), 'base64');
    invalid.writeUIntLE(319, 24, 3);
    expect(() => validateCover({
      mimeType: 'image/webp',
      base64: invalid.toString('base64'),
      width: 640,
      height: 400,
    })).toThrow('640 × 400');
  });

  it('rejects repository names that cannot produce a safe canonical slug', () => {
    expect(repositorySlug('Les-Petites-Quetes')).toBe('les-petites-quetes');
    expect(() => repositorySlug('...')).toThrow('inutilisable');
  });
});
