import { QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

import { UsersUsecasesProvider } from '../presentation/di/users-usecases.context';
import { createUsersModule, type UsersModuleConfig } from './create-users-module';

interface UsersProviderProps extends UsersModuleConfig {
  children: ReactNode;
}

export const UsersProvider = ({ children, ...config }: UsersProviderProps) => {
  const [{ queryClient, usecases }] = useState(() => createUsersModule(config));

  return (
    <QueryClientProvider client={queryClient}>
      <UsersUsecasesProvider value={usecases}>{children}</UsersUsecasesProvider>
    </QueryClientProvider>
  );
};
