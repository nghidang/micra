import type { UserRepository } from '../../domain/interfaces/user.repository';
import type { UserDTO } from '../../domain/dtos/user.dto';
import type { CreateUserInput } from '../../domain/dtos/create-user.dto';

const MOCK: UserDTO[] = [
  { id: 1, name: 'Ann Nguyen', email: 'ann@micra.app', username: 'ann' },
  { id: 2, name: 'Binh Tran', email: 'binh@micra.app', username: 'binh' },
  { id: 3, name: 'Chi Le', email: 'chi@micra.app', username: 'chi' },
];

export class InMemoryUserAdapter implements UserRepository {
  async getAll(): Promise<UserDTO[]> {
    await new Promise((r) => setTimeout(r, 300));
    return [...MOCK];
  }
  async create(input: CreateUserInput): Promise<UserDTO> {
    const dto: UserDTO = { id: MOCK.length + 1, name: input.name, email: input.email, username: input.name.toLowerCase() };
    MOCK.push(dto);
    return dto;
  }
}
