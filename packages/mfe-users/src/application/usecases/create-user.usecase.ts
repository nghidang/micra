import type { UserRepository } from '../../domain/interfaces/user.repository';
import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import { validateCreateUser } from '../../domain/rules/user.rules';
import { AppError } from '../../domain/errors/app-error';

export class CreateUserUsecase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: CreateUserInput) {
    const errors = validateCreateUser(input);   // Rules (DOMAIN)
    if (errors.length) throw new AppError(errors[0]); // ném Domain Error Format
    return this.repo.create(input);
  }
}
