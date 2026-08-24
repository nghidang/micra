import type { UserRepository } from '../domain/user.repository';

export interface UserListItem { id: string; label: string; sub: string; }

export class GetUsersUsecase {
  constructor(private readonly repo: UserRepository) {}
  async execute(): Promise<UserListItem[]> {
    const users = await this.repo.getAll();
    return users.map((u) => ({ id: u.id, label: u.name, sub: u.email }));
  }
}
