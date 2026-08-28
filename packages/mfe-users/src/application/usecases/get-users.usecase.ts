import type { UserRepository } from '../../domain/interfaces/user.repository';

export interface UserListItem {
  id: string;
  label: string;
  sub: string;
}

export class GetUsersUsecase {
  constructor(private readonly repo: UserRepository) {}

  async execute(): Promise<UserListItem[]> {
    const dtos = await this.repo.getAll();
    // Map DTO (API shape) → Data State (view model)
    return dtos.map((d) => ({ id: String(d.id), label: d.name, sub: d.email }));
  }
}
