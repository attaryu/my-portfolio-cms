import type { IUpdateTechUseCase } from '@/server/app/use-cases/techs/update';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { HttpError } from '../../helper/http-error';
import { techPayloadSchema } from '../../validations/tech/payload';

export class UpdateTechController implements IController {
	constructor(private readonly updateTechUseCase: IUpdateTechUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const { techId } = request.params;

			if (!techId) {
				throw HttpError.badRequest('Tech ID is required');
			}

			const tech = await this.updateTechUseCase.execute(
				request.params.techId,
				techPayloadSchema.parse(request.body)
			);

			return {
				status: 'success',
				status_code: 200,
				message: 'Tech updated successfully',
				data: { tech },
			};
		} catch (error) {
			if (error instanceof TechUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			if (error instanceof TechUseCaseErrors.UniqueField) {
				throw HttpError.badRequest(error.message);
			}

			throw error;
		}
	}
}
