import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useUsersUiStore } from '../../application/stores/ui/users.ui.store';
import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import { AppError } from '../../domain/errors/app.error';
import { useUsersUsecases } from '../di/users.usecases.context';

const USERS_KEY = ['users'] as const;

export function useUsersQuery() {
  const { getUsers } = useUsersUsecases();
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: () => getUsers.execute(),
  });
}

export function useCreateUser() {
  const { createUser } = useUsersUsecases();
  const notify = useUsersUiStore((s) => s.notify);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser.execute(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }),
    onError: (e) => {
      const code = e instanceof AppError ? e.code : 'UNKNOWN';
      if (code === 'AUTH') return;
      notify(code);
    },
  });
}
