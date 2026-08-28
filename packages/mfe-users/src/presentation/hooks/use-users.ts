import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUsersUsecases } from '../../application/di/users-usecases.context';
import { useUsersUiStore } from '../../application/stores/ui/users-ui.store';
import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import { AppError } from '../../domain/errors/app-error';

const USERS_KEY = ['users'] as const;

export function useUsersQuery() {
  const { getUsers } = useUsersUsecases();
  return useQuery({
    queryKey: USERS_KEY,
    queryFn: () => getUsers.execute(),   // trả UserListItem[] (VM)
  });
}

export function useCreateUser() {
  const { createUser } = useUsersUsecases();
  const notify = useUsersUiStore((s) => s.notify);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateUserInput) => createUser.execute(input),
    onSuccess: () => qc.invalidateQueries({ queryKey: USERS_KEY }), // refetch thay get().load()
    onError: (e) => notify(e instanceof AppError ? e.code : 'UNKNOWN'),
  });
}
