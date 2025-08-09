import type { IGetTechUseCase } from '@/server/app/use-cases/techs/get';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { HttpError } from '../../helper/http-error';
import { id } from '../../validations/id';

export class GetTechController implements IController {
	constructor(private readonly getTechUseCase: IGetTechUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const { techId } = request.params;

			if (!techId) {
				throw HttpError.badRequest('Tech ID is required');
			}

			id.parse(techId);

			const tech = await this.getTechUseCase.execute(techId);

			return {
				status_code: 200,
				status: 'success',
				message: 'Tech retrieved successfully',
				data: { tech },
			};
		} catch (error) {
			if (error instanceof TechUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
