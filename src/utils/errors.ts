export function isAbortError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false;
  return 'name' in error && (error as { readonly name?: unknown }).name === 'AbortError';
}
