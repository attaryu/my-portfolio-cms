import type { IUpdateOwnerCredentialDTO } from '@/server/app/dtos/owner/update-credential';
import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { IHashing } from '@/server/app/services/hashing';
import type { IUpdateOwnerCredentialUseCase } from '../update-credential';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';

export class UpdateOwnerCredentialUseCase
	implements IUpdateOwnerCredentialUseCase
{
	constructor(
		private readonly ownerRepository: IOwnerRepository,
		private readonly hashing: IHashing
	) {}

	async execute(data: IUpdateOwnerCredentialDTO): Promise<void> {
		const owner = await this.ownerRepository.getOwner();

		if (!owner) {
			throw new OwnerUseCaseErrors.NotFound();
		}

		owner.email = data.email;
		owner.refreshToken = undefined;

		if (data.new_password && data.current_password) {
			await owner.password.isSame(data.current_password, this.hashing);
			owner.password = await this.hashing.generateHash(data.new_password);
		}

		await this.ownerRepository.updateOwner(owner);
	}
}
