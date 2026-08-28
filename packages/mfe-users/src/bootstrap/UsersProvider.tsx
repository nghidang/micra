import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

import { UsersUsecasesProvider } from '../application/di/users-usecases.context';
import { CreateUserUsecase } from '../application/usecases/create-user.usecase';
import { GetUsersUsecase } from '../application/usecases/get-users.usecase';
import { createUserHttpAdapter } from '../infra/adapters/user.http.adapter';
import { createUserApiService } from '../infra/services/user-api.service';

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const [{ qc, usecases }] = useState(() => {
    const service = createUserApiService({
      onAuthError: () => {
        /* redirect login */
      },
    });
    const adapter = createUserHttpAdapter(service);
    return {
      qc: new QueryClient(),
      usecases: {
        getUsers: new GetUsersUsecase(adapter),
        createUser: new CreateUserUsecase(adapter),
      },
    };
  });

  return (
    <QueryClientProvider client={qc}>
      <UsersUsecasesProvider value={usecases}>{children}</UsersUsecasesProvider>
    </QueryClientProvider>
  );
};
