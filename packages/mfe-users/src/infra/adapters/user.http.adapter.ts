import type { UserRepository } from '../../domain/interfaces/user.repository';
import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import { AppError } from '../../domain/errors/app-error';
import { HttpError, type UserApiService } from '../services/user-api.service';

const toAppError = (e: unknown): AppError => {
  if (e instanceof HttpError) {
    if (e.status === 404) return new AppError('NOT_FOUND');
    if (e.status === 409) return new AppError('CONFLICT');
    return new AppError('UNKNOWN');
  }
  return new AppError('NETWORK'); // fetch reject = lỗi mạng
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
  }
});
