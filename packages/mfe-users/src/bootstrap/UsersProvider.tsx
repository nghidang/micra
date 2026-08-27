import type { ReactNode } from 'react';
import { createUserApiService } from '../infra/services/user-api.service';
import { createUserHttpAdapter } from '../infra/adapters/user.http.adapter';
import { GetUsersUsecase } from '../application/usecases/get-users.usecase';
import { CreateUserUsecase } from '../application/usecases/create-user.usecase';
import { createUsersDataStore, UsersDataStoreProvider } from '../application/stores/data/users.store';

const service = createUserApiService({
  onAuthError: () => {
    /* redirect login */
  }
});
const adapter = createUserHttpAdapter(service);
const usersDataStore = createUsersDataStore({
  getUsers: new GetUsersUsecase(adapter),
  createUser: new CreateUserUsecase(adapter),
});

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => (
  <UsersDataStoreProvider value={usersDataStore}>{children}</UsersDataStoreProvider>
);
