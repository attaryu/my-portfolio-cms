import type { IOwnerPublicInfoUpdateUseCase } from '@/server/app/use-cases/owner/public-info-update';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { HttpError } from '../../helper/http-error';
import { ownerPublicInfoPayloadSchema } from '../../validations/owner/public-info-payload';

export class OwnerPublicInfoUpdateController implements IController {
	constructor(private readonly useCase: IOwnerPublicInfoUpdateUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const refreshToken = request.cookies.get('REFRESH_TOKEN')?.value;

			if (!refreshToken) {
				throw HttpError.unauthorized('Refresh token is required');
			}

			const payload = ownerPublicInfoPayloadSchema.parse(request.body);
			const updatedOwnerPublicInfo = await this.useCase.execute(
				refreshToken,
				payload
			);

			return {
				status_code: 200,
				status: 'success',
				message: 'Owner public information updated successfully',
				data: {
					owner: updatedOwnerPublicInfo,
				},
			};
		} catch (error) {
			if (error instanceof OwnerUseCaseErrors.InvalidToken) {
				throw HttpError.unauthorized(error.message);
			}

			if (error instanceof OwnerUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
