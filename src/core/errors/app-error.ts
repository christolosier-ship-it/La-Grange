export type AppErrorCode =
  | 'network'
  | 'not-found'
  | 'rate-limit'
  | 'invalid-response'
  | 'invalid-overrides'
  | 'cache';

export class AppError extends Error {
  constructor(
    readonly code: AppErrorCode,
    message: string,
    readonly userMessage: string,
    readonly recoverable: boolean,
    readonly retryAt?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
