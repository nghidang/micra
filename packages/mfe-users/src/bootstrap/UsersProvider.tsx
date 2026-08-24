import type { ReactNode } from 'react';
import { InMemoryUserAdapter } from '../infra/in-memory-user.adapter';
import { GetUsersUsecase } from '../application/get-users.usecase';
import { UsersUsecaseProvider } from '../application/users.context';

const usecase = new GetUsersUsecase(new InMemoryUserAdapter());

export const UsersProvider = ({ children }: { children: ReactNode }) => (
  <UsersUsecaseProvider value={usecase}>{children}</UsersUsecaseProvider>
);
