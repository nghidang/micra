import { createContext, useContext, useEffect, useState } from 'react';
import type { GetUsersUsecase, UserListItem } from './get-users.usecase';

const UsecaseContext = createContext<GetUsersUsecase | null>(null);
export const UsersUsecaseProvider = UsecaseContext.Provider;

export function useUsers() {
  const usecase = useContext(UsecaseContext);
  if (!usecase) throw new Error('Thiếu UsersProvider bao quanh');
  const [items, setItems] = useState<UserListItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let alive = true;
    usecase.execute().then((r) => { if (alive) { setItems(r); setLoading(false); } });
    return () => { alive = false; };
  }, [usecase]);
  return { items, loading };
}
