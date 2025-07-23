import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { ITokenManager } from '@/server/app/services/token-manager';
import type { IOwnerLogoutUseCase } from '../logout';

export class OwnerLogoutUseCase implements IOwnerLogoutUseCase {
	constructor(
		public readonly _ownerRepository: IOwnerRepository,
		public readonly _tokenManager: ITokenManager
	) {}

	async execute(refreshToken: string): Promise<void> {
		const tokenPayload = this._tokenManager.verifyToken(refreshToken);
		const owner = await this._ownerRepository.getOwnerById(tokenPayload.id);

		owner.refreshToken?.isSameAs(refreshToken);

		owner.refreshToken = null;
		await this._ownerRepository.updateOwner(owner);
	}
}
