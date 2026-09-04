import type { CreateUserInput } from '../dtos/create-user.dto';
import type { UserDTO } from '../dtos/user.dto';

export interface UserRepository {
  getAll(): Promise<UserDTO[]>;
  create(input: CreateUserInput): Promise<UserDTO>;
}
