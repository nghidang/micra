import { createContext, useContext } from 'react';

import type { CreateUserUsecase } from '../usecases/create-user.usecase';
import type { GetUsersUsecase } from '../usecases/get-users.usecase';

export interface UsersUsecases {
  getUsers: GetUsersUsecase;
  createUser: CreateUserUsecase;
}

const Ctx = createContext<UsersUsecases | null>(null);
export const UsersUsecasesProvider = Ctx.Provider;

export function useUsersUsecases(): UsersUsecases {
  const v = useContext(Ctx);
  if (!v) throw new Error('Thiếu UsersProvider bao quanh');
  return v;
}
