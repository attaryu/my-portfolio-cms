import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { ITokenManager } from '@/server/app/services/token-manager';
import type { IOwnerLogoutUseCase } from '../logout';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';

export class OwnerLogoutUseCase implements IOwnerLogoutUseCase {
	constructor(
		public readonly ownerRepository: IOwnerRepository,
		public readonly tokenManager: ITokenManager
	) {}

	async execute(refreshToken: string): Promise<void> {
		const tokenPayload = await this.tokenManager.verifyToken(refreshToken);

		if (!tokenPayload || tokenPayload.token_type !== 'refresh') {
			throw new OwnerUseCaseErrors.InvalidToken('refresh');
		}

		const owner = await this.ownerRepository.getOwnerById(tokenPayload.id);

		if (!owner) {
			throw new OwnerUseCaseErrors.NotFound();
		}

		owner.refreshToken.isExist();
		owner.refreshToken.isSameAs(refreshToken);

		owner.refreshToken = undefined;
		await this.ownerRepository.updateOwner(owner);
	}
}
