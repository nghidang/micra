import type { ReactNode } from 'react';
import { HttpUserAdapter } from '../infra/adapters/user.http.adapter';
import { GetUsersUsecase } from '../application/usecases/get-users.usecase';
import { CreateUserUsecase } from '../application/usecases/create-user.usecase';
import { createUsersDataStore, UsersDataStoreProvider } from '../application/stores/data/users.store';

const adapter = new HttpUserAdapter();
const usersDataStore = createUsersDataStore({
  getUsers: new GetUsersUsecase(adapter),
  createUser: new CreateUserUsecase(adapter),
});

export const UsersProvider = ({ children }: { children: ReactNode }) => (
  <UsersDataStoreProvider value={usersDataStore}>{children}</UsersDataStoreProvider>
);
