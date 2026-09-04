import type { CreateUserInput } from '../../domain/dtos/create-user.dto';
import { AppError } from '../../domain/errors/app.error';
import type { UserRepository } from '../../domain/interfaces/user.repository';
import { validateCreateUser } from '../../domain/rules/user.rules';

export class CreateUserUsecase {
  constructor(private readonly repo: UserRepository) {}

  async execute(input: CreateUserInput) {
    const errors = validateCreateUser(input);
    if (errors.length) throw new AppError(errors[0]);
    return this.repo.create(input);
  }
}
