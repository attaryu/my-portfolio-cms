import type { IOwnerPublicInfoOutDTO } from '@/server/app/dtos/owner/public-info-out';
import type { IOwnerPublicInfoPayloadDTO } from '@/server/app/dtos/owner/public-info-update';
import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { IOwnerPublicInfoUpdateUseCase } from '../public-info-update';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { ITokenManager } from '@/server/app/services/token-manager';

export class OwnerPublicInfoUpdateUseCase
	implements IOwnerPublicInfoUpdateUseCase
{
	constructor(
		private readonly ownerRepository: IOwnerRepository,
		private readonly tokenManager: ITokenManager
	) {}

	async execute(
		token: string,
		data: IOwnerPublicInfoPayloadDTO
	): Promise<IOwnerPublicInfoOutDTO> {
		const payload = await this.tokenManager.verifyToken(token);

		if (!payload) {
			throw new OwnerUseCaseErrors.InvalidToken('refresh');
		}

		const ownerId = payload.id;
		const ownerPublicInfo = await this.ownerRepository.getOwnerPublicInfo();

		if (!ownerPublicInfo) {
			throw new OwnerUseCaseErrors.NotFound();
		}

		return await this.ownerRepository.updateOwnerPublicInfo(ownerId, {
			...ownerPublicInfo,
			...data,
		});
	}
}
