import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { IHashing } from '@/server/app/services/hashing';
import type { ITokenManager } from '@/server/app/services/token-manager';
import type { IOwnerLoginUseCase, ITokenResult } from '../login';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { PasswordErrors } from '@/server/domain/errors/value-objects/password';

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

			const refreshToken = await this._tokenManager.generateRefreshToken(
				owner.id!
			);

			const accessToken = await this._tokenManager.generateAccessToken(
				owner.id!
			);

			owner.refreshToken = refreshToken.value;
			await this._ownerRepository.updateOwner(owner);

			return {
				accessToken: {
					value: accessToken.value,
					expiresIn: accessToken.expiresIn,
				},
				refreshToken: {
					value: refreshToken.value,
					expiresIn: refreshToken.expiresIn,
				},
			};
		} catch (error) {
			if (
				error instanceof OwnerUseCaseErrors.NotFound ||
				error instanceof PasswordErrors.DoesNotMatch
			) {
				throw new OwnerUseCaseErrors.InvalidCredentials();
			}

			throw error;
		}
	}
}
