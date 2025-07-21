import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { IHashing } from '@/server/app/services/hashing';
import type {
	ITokenManager,
	ITokenResult,
} from '@/server/app/services/token-manager';
import type { IOwnerLoginUseCase } from '../login';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { PasswordError } from '@/server/domain/errors/value-objects/password';

export class OwnerLoginUseCase implements IOwnerLoginUseCase {
	constructor(
		private readonly _ownerRepository: IOwnerRepository,
		private readonly _tokenManager: ITokenManager,
		private readonly _hashing: IHashing
	) {}

	async execute(email: string, password: string): Promise<ITokenResult> {
		try {
			const owner = await this._ownerRepository.getOwnerByEmail(email);

			if (!owner) {
				throw new OwnerUseCaseErrors.NotFound();
			}

			await owner.password.isSame(password, this._hashing);

			const tokenResult = this._tokenManager.generateToken({ id: owner.id! });

			owner.refreshToken = tokenResult.refreshToken.value;
			await this._ownerRepository.updateOwner(owner);

			return tokenResult;
		} catch (error) {
			if (
				error instanceof OwnerUseCaseErrors.NotFound ||
				error instanceof PasswordError.DoesNotMatch
			) {
				throw new OwnerUseCaseErrors.InvalidCredentials();
			}

			throw error;
		}
	}
}
