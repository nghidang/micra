import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import { AppError, type BaseErrorCode } from '../../domain/errors/app-error';
import type { UserRepository } from '../../domain/interfaces/user.repository';
import { HttpError, type UserApiService } from '../services/user-api.service';

const STATUS_MAP: Partial<Record<number, BaseErrorCode>> = {
  401: 'AUTH',
  403: 'AUTH',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
};

const toAppError = (e: unknown): AppError => {
  if (!(e instanceof HttpError)) return new AppError('NETWORK');
  return new AppError(STATUS_MAP[e.status] ?? 'UNKNOWN');
};

export const createUserHttpAdapter = (service: UserApiService): UserRepository => ({
  async getAll() {
    try {
      return await service.fetchUsers();
    } catch (e) {
      throw toAppError(e);
    }
  },
  async create(input: CreateUserInput) {
    try {
      return await service.postUser(input);
    } catch (e) {
      throw toAppError(e);
    }
  },
});
