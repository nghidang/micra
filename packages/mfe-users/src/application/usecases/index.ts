import type { CreateUserUsecase } from './create-user.usecase';
import type { GetUsersUsecase } from './get-users.usecase';

export interface UsersUsecases {
  getUsers: GetUsersUsecase;
  createUser: CreateUserUsecase;
}
