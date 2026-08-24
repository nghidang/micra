export type ErrorCode =
  | 'NAME_REQUIRED' | 'EMAIL_INVALID'   // validation
  | 'NOT_FOUND' | 'CONFLICT'            // nghiệp vụ
  | 'NETWORK' | 'UNKNOWN';              // hạ tầng

export class AppError extends Error {
  constructor(public readonly code: ErrorCode, message?: string) {
    super(message ?? code);
    this.name = 'AppError';
  }
}
