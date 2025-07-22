import type { IOwnerGetAccessTokenUseCase } from '../get-access-token';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { IOwnerRepository } from '@/server/app/repositories/owner';
import {
	ITokenManager,
	ITokenResult,
} from '@/server/app/services/token-manager';

export class OwnerGetAccessTokenUseCase implements IOwnerGetAccessTokenUseCase {
	constructor(
		private readonly _ownerRepository: IOwnerRepository,
		private readonly _tokenManager: ITokenManager
	) {}

	async execute(refreshToken: string): Promise<ITokenResult['accessToken']> {
		const tokenPayload = this._tokenManager.verifyToken(refreshToken);
		const owner = await this._ownerRepository.getOwnerById(tokenPayload.id);

		if (!owner.isRefreshTokenSame(refreshToken)) {
			throw new OwnerUseCaseErrors.DifferentRefreshToken();
		}

		const { accessToken } = this._tokenManager.generateToken({ id: owner.id! });

		return accessToken;
	}
}
