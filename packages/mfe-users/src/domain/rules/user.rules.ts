import type { CreateUserInput } from '../dtos/create-user.dto';
import type { ErrorCode } from '../errors/app.error';

export function validateCreateUser(input: CreateUserInput): ErrorCode[] {
  const errors: ErrorCode[] = [];
  if (!input.name.trim()) errors.push('NAME_REQUIRED');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.email)) errors.push('EMAIL_INVALID');
  return errors;
}
