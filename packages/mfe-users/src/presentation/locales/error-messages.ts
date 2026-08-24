import type { ErrorCode } from '../../domain/errors/app-error';

export const errorMessages: Record<ErrorCode, string> = {
  NAME_REQUIRED: 'Tên không được để trống',
  EMAIL_INVALID: 'Email không hợp lệ',
  NOT_FOUND: 'Không tìm thấy',
  CONFLICT: 'Dữ liệu bị trùng',
  NETWORK: 'Lỗi mạng, thử lại sau',
  UNKNOWN: 'Có lỗi xảy ra',
};
