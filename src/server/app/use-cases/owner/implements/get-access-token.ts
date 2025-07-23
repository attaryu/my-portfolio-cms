import type { IOwnerGetAccessTokenUseCase } from '../get-access-token';

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
		const tokenPayload = await this._tokenManager.verifyToken(refreshToken);
		const owner = await this._ownerRepository.getOwnerById(tokenPayload.id);

		owner.refreshToken?.isSameAs(refreshToken);

		const { accessToken } = await this._tokenManager.generateToken({
			id: owner.id!,
		});

		return accessToken;
	}
}
