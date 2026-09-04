import type { UserDTO } from '../../domain/dtos/user.dto';
import type { UserRepository } from '../../domain/interfaces/user.repository';

export interface UserListItem {
  id: string;
  label: string;
  sub: string;
}

function toUserListItem(dto: UserDTO): UserListItem {
  return {
    id: String(dto.id),
    label: dto.name.trim(),
    sub: dto.email,
  };
}

export class GetUsersUsecase {
  constructor(private readonly repo: UserRepository) {}

  async execute(): Promise<UserListItem[]> {
    const dtos = await this.repo.getAll();
    // Map DTO (API shape) → Data State (view model)
    return dtos.map(toUserListItem);
  }
}
