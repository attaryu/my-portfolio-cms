import type { ICreateProjectUseCase } from '@/server/app/use-cases/project/create';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { MainLinkErrors } from '@/server/domain/errors/value-objects/main-link';
import { HttpError } from '../../helper/http-error';
import { projectPayloadSchema } from '../../validations/project/payload';

export class CreateProjectController implements IController {
	constructor(private readonly createProjectUseCase: ICreateProjectUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const payload = projectPayloadSchema.parse(request.body);
			const projectId = await this.createProjectUseCase.execute(payload);

			return {
				message: 'Project created successfully',
				status_code: 201,
				status: 'success',
				data: { projectId },
			};
		} catch (error) {
			if (error instanceof MainLinkErrors.InvalidType) {
				throw HttpError.badRequest(error.message);
			}

			if (error instanceof TechUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
