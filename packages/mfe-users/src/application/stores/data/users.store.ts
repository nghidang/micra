import { createContext, useContext } from 'react';
import { create } from 'zustand';
import type { GetUsersUsecase, UserListItem } from '../../usecases/get-users.usecase';
import type { CreateUserUsecase } from '../../usecases/create-user.usecase';
import type { CreateUserInput } from '../../../domain/dtos/create-user.dto';

export interface UsersDataState {
  items: UserListItem[];
  loading: boolean;
  load: () => Promise<void>;
  create: (input: CreateUserInput) => Promise<void>;
}

interface Usecases { getUsers: GetUsersUsecase; createUser: CreateUserUsecase; }

export const createUsersDataStore = (usecases: Usecases) =>
  create<UsersDataState>((set, get) => ({
    items: [],
    loading: false,
    load: async () => {
      set({ loading: true });
      const items = await usecases.getUsers.execute();
      set({ items, loading: false });
    },
    create: async (input) => {
      await usecases.createUser.execute(input); // có thể ném ValidationError
      await get().load();                        // refetch → cập nhật Data Store
    },
  }));

type UsersDataStore = ReturnType<typeof createUsersDataStore>;
const Ctx = createContext<UsersDataStore | null>(null);
export const UsersDataStoreProvider = Ctx.Provider;
export function useUsersDataStore(): UsersDataStore {
  const store = useContext(Ctx);
  if (!store) throw new Error('Thiếu UsersProvider bao quanh');
  return store;
}
