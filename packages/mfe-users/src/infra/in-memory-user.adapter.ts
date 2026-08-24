import type { UserRepository } from '../domain/user.repository';
import type { User } from '../domain/user.entity';

const MOCK: User[] = [
  { id: '1', name: 'Ann Nguyen', email: 'ann@micra.app' },
  { id: '2', name: 'Binh Tran', email: 'binh@micra.app' },
  { id: '3', name: 'Chi Le', email: 'chi@micra.app' },
];

export class InMemoryUserAdapter implements UserRepository {
  async getAll(): Promise<User[]> {
    await new Promise((r) => setTimeout(r, 300)); // giả lập latency
    return MOCK;
  }
}
