import { QueryClientProvider } from '@tanstack/react-query';
import type { i18n as I18nInstance } from 'i18next';
import { useState, type ReactNode } from 'react';

import { UsersUsecasesProvider } from '../presentation/di/users-usecases.context';
import { registerUsersLocale } from '../presentation/locales';
import { createUsersModule, type UsersModuleConfig } from './create-users-module';

interface UsersProviderProps extends UsersModuleConfig {
  children: ReactNode;
  i18n?: I18nInstance;
}

export const UsersProvider = ({ children, i18n, ...config }: UsersProviderProps) => {
  const [{ queryClient, usecases }] = useState(() => createUsersModule(config));

  if (i18n) registerUsersLocale(i18n);

  return (
    <QueryClientProvider client={queryClient}>
      <UsersUsecasesProvider value={usecases}>{children}</UsersUsecasesProvider>
    </QueryClientProvider>
  );
};
