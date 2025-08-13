import type { ILandingOutDTO } from '@/server/app/dtos/landing/out';
import type { ILandingRepository } from '@/server/app/repositories/landing';
import type { IGetLandingUseCase } from '../get';

import { LandingDataUseCaseErrors } from '@/server/app/errors/use-cases/landing';

export class GetLandingUseCase implements IGetLandingUseCase {
	constructor(private readonly landingRepository: ILandingRepository) {}

	async execute(): Promise<ILandingOutDTO> {
		const data = await this.landingRepository.getLanding();

		if (!data) {
			throw new LandingDataUseCaseErrors.NotFound();
		}

		return data;
	}
}
