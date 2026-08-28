export type ErrorCode =
  // validation
  | 'NAME_REQUIRED'
  | 'EMAIL_INVALID'
  // nghiệp vụ
  | 'NOT_FOUND'
  | 'CONFLICT'
  // hạ tầng
  | 'NETWORK'
  | 'UNKNOWN';

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message?: string,
  ) {
    super(message ?? code);
    this.name = 'AppError';
  }
}
