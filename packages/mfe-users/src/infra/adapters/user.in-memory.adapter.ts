import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import type { UserDTO } from '../../domain/dtos/user.dto';
import type { UserRepository } from '../../domain/interfaces/user.repository';

const DEFAULT_SEED: UserDTO[] = [
  { id: 1, name: 'Ann Nguyen', email: 'ann@micra.app', username: 'ann' },
  { id: 2, name: 'Binh Tran', email: 'binh@micra.app', username: 'binh' },
  { id: 3, name: 'Chi Le', email: 'chi@micra.app', username: 'chi' },
];

export const createInMemoryUserAdapter = (
  seed: UserDTO[] = DEFAULT_SEED,
  delayMs = 300,
): UserRepository => {
  const users: UserDTO[] = seed.map((u) => ({ ...u }));
  let nextId = users.reduce((max, u) => Math.max(max, u.id), 0) + 1;

  return {
    async getAll() {
      if (delayMs) await new Promise((r) => setTimeout(r, delayMs));
      return users.map((u) => ({ ...u }));
    },
    async create(input: CreateUserInput) {
      const dto: UserDTO = {
        id: nextId++,
        name: input.name,
        email: input.email,
        username: input.name.trim().toLowerCase().replace(/\s+/g, '.'),
      };
      users.push(dto);
      return { ...dto };
    },
  };
};
