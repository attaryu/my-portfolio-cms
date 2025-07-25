import type { ICreateTechUseCase } from '@/server/app/use-cases/techs/create';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { HttpError } from '../../helper/http-error';
import { techPayloadSchema } from '../../validations/tech/payload';

export class CreateTechController implements IController {
	constructor(private readonly createTechUseCase: ICreateTechUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const requestBody = techPayloadSchema.parse(request.body);
			const tech = await this.createTechUseCase.execute(requestBody);

			return {
				status: 'success',
				statusCode: 201,
				data: { tech },
				message: 'Tech created successfully',
			};
		} catch (error) {
			if (
				error instanceof TechUseCaseErrors.TechLogoUrlAlreadyExists ||
				error instanceof TechUseCaseErrors.TechNameAlreadyExists
			) {
				throw HttpError.badRequest(error.message);
			}

			throw error;
		}
	}
}
