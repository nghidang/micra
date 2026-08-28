import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import type { UserDTO } from '../../domain/dtos/user.dto';
import type { UserRepository } from '../../domain/interfaces/user.repository';

const MOCK: UserDTO[] = [
  { id: 1, name: 'Ann Nguyen', email: 'ann@micra.app', username: 'ann' },
  { id: 2, name: 'Binh Tran', email: 'binh@micra.app', username: 'binh' },
  { id: 3, name: 'Chi Le', email: 'chi@micra.app', username: 'chi' },
];

export const createInMemoryUserAdapter = (): UserRepository => {
  const users: UserDTO[] = [...MOCK]; // state riêng mỗi instance

  return {
    async getAll() {
      await new Promise((r) => setTimeout(r, 300));
      return [...users];
    },
    async create(input: CreateUserInput) {
      const dto: UserDTO = {
        id: users.length + 1,
        name: input.name,
        email: input.email,
        username: input.name.toLowerCase(),
      };
      users.push(dto);
      return dto;
    },
  };
};
