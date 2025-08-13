import type { IGetLandingUseCase } from '@/server/app/use-cases/landing/get';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { LandingDataUseCaseErrors } from '@/server/app/errors/use-cases/landing';
import { HttpError } from '../../helper/http-error';

export class GetLandingController implements IController {
	constructor(private readonly getLandingUseCase: IGetLandingUseCase) {}

	async handle(): Promise<IResponse> {
		try {
			const landingData = await this.getLandingUseCase.execute();

			return {
				status_code: 200,
				status: 'success',
				message: 'Landing data retrieved successfully',
				data: { landing_data: landingData },
			};
		} catch (error) {
			if (error instanceof LandingDataUseCaseErrors.NotFound) {
				throw HttpError.badRequest(error.message);
			}

			throw error;
		}
	}
}
