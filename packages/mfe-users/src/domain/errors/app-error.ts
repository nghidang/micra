export type BaseErrorCode =
  // hạ tầng / transport — generic, mọi feature dùng chung
  'AUTH' | 'NETWORK' | 'UNKNOWN' | 'NOT_FOUND' | 'CONFLICT';

export type ErrorCode =
  | BaseErrorCode
  // validation — riêng feature user
  | 'NAME_REQUIRED'
  | 'EMAIL_INVALID';

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    message?: string,
  ) {
    super(message ?? code);
    this.name = 'AppError';
  }
}
