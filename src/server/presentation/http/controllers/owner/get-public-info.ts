import type { IGetOwnerPublicInfoUseCase } from '@/server/app/use-cases/owner/get-public-info';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { HttpError } from '../../helper/http-error';

export class GetOwnerPublicInfoController implements IController {
	constructor(
		private readonly getOwnerPublicInfoUseCase: IGetOwnerPublicInfoUseCase
	) {}

	async handle(): Promise<IResponse> {
		try {
			const ownerPublicInfo = await this.getOwnerPublicInfoUseCase.execute();

			return {
				status_code: 200,
				status: 'success',
				message: 'Owner public information retrieved successfully',
				data: { owner: ownerPublicInfo },
			};
		} catch (error) {
			if (error instanceof OwnerUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
