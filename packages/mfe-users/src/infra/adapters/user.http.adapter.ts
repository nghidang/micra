import type { UserRepository } from '../../domain/interfaces/user.repository';
import type { UserDTO } from '../../domain/dtos/user.dto';
import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import { AppError } from '../../domain/errors/app-error';

export class HttpUserAdapter implements UserRepository {
  constructor(
    private readonly baseUrl = 'https://jsonplaceholder.typicode.com',
    private readonly onAuthError?: () => void, // shell inject: redirect login
  ) {}

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    let res: Response;
    try {
      res = await fetch(`${this.baseUrl}${path}`, init);
    } catch {
      throw new AppError('NETWORK');           // lỗi mạng
    }
    if (res.status === 401 || res.status === 403) {
      this.onAuthError?.();                     // Auth: INFRA tự xử, KHÔNG ném nghiệp vụ lên usecase
      throw new AppError('UNKNOWN');
    }
    if (!res.ok) {
      // Lỗi nghiệp vụ → ép sang Domain Error Format
      throw new AppError(res.status === 404 ? 'NOT_FOUND' : res.status === 409 ? 'CONFLICT' : 'UNKNOWN');
    }
    return (await res.json()) as T;
  }

  getAll(): Promise<UserDTO[]> {
    return this.request<UserDTO[]>('/users');
  }
  create(input: CreateUserInput): Promise<UserDTO> {
    return this.request<UserDTO>('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
  }
}
