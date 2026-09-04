import { createContext, useContext } from 'react';

import type { UsersUsecases } from '../../application/usecases';

const Ctx = createContext<UsersUsecases | null>(null);
export const UsersUsecasesProvider = Ctx.Provider;

export function useUsersUsecases(): UsersUsecases {
  const v = useContext(Ctx);
  if (!v) throw new Error('Thiếu UsersProvider bao quanh');
  return v;
}
