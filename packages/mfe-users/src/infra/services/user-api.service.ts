import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import type { UserDTO } from '../../domain/dtos/user.dto';

export class HttpError extends Error {
  constructor(public readonly status: number) {
    super(`HTTP ${status}`);
    this.name = 'HttpError';
  }
}

export interface UserApiServiceConfig {
  baseURL?: string;
  onAuthError?: () => void; // interceptor hạ tầng: 401/403 tự xử lý
}

export interface UserApiService {
  fetchUsers: () => Promise<UserDTO[]>;
  postUser: (input: CreateUserInput) => Promise<UserDTO>;
}

export const createUserApiService = (config: UserApiServiceConfig = {}): UserApiService => {
  const baseURL = config.baseURL ?? 'https://jsonplaceholder.typicode.com';

  const request = async (path: string, init?: RequestInit): Promise<Response> => {
    const res = await fetch(`${baseURL}${path}`, init);
    if (res.status === 401 || res.status === 403) {
      config.onAuthError?.(); // auth: KHÔNG ném lên usecase
      throw new HttpError(res.status);
    }
    if (!res.ok) throw new HttpError(res.status);
    return res;
  };

  return {
    async fetchUsers() {
      const res = await request('/users');
      return res.json() as Promise<UserDTO[]>;
    },
    async postUser(input) {
      const res = await request('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      return res.json() as Promise<UserDTO>;
    },
  };
};
