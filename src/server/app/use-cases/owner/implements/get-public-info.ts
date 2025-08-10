import type { IOwnerPublicInfoOutDTO } from '@/server/app/dtos/owner/public-info-out';
import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { IGetOwnerPublicInfoUseCase } from '../get-public-info';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';

export class GetOwnerPublicInfoUseCase implements IGetOwnerPublicInfoUseCase {
	constructor(private readonly ownerRepository: IOwnerRepository) {}

	async execute(): Promise<IOwnerPublicInfoOutDTO> {
		const ownerPublicInfo = await this.ownerRepository.getOwnerPublicInfo();

		if (!ownerPublicInfo) {
			throw new OwnerUseCaseErrors.NotFound();
		}

		return ownerPublicInfo;
	}
}
