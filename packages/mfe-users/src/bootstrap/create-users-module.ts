import { QueryClient } from '@tanstack/react-query';

import type { UsersUsecases } from '../application/usecases';
import { CreateUserUsecase } from '../application/usecases/create-user.usecase';
import { GetUsersUsecase } from '../application/usecases/get-users.usecase';
import type { UserRepository } from '../domain/interfaces/user.repository';
import { createUserHttpAdapter } from '../infra/adapters/user.http.adapter';
import { createUserApiService } from '../infra/services/user-api.service';

export interface UsersModuleConfig {
  baseURL?: string;
  onAuthError?: () => void;
  // test/offline: tiêm createInMemoryUserAdapter()
  adapter?: UserRepository;
  // host muốn share 1 QueryClient chung
  queryClient?: QueryClient;
}

export interface UsersModule {
  queryClient: QueryClient;
  usecases: UsersUsecases;
}

export function createUsersModule(config: UsersModuleConfig = {}): UsersModule {
  const adapter =
    config.adapter ??
    createUserHttpAdapter(
      createUserApiService({ baseURL: config.baseURL, onAuthError: config.onAuthError }),
    );

  return {
    queryClient: config.queryClient ?? new QueryClient(),
    usecases: {
      getUsers: new GetUsersUsecase(adapter),
      createUser: new CreateUserUsecase(adapter),
    },
  };
}
