import type { IUpdateProjectUseCase } from '@/server/app/use-cases/project/update';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';
import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { HttpError } from '../../helper/http-error';
import { id } from '../../validations/id';
import { projectPayloadSchema } from '../../validations/project/payload';

export class UpdateProjectController implements IController {
	constructor(private readonly updateProjectUseCase: IUpdateProjectUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const { projectId } = request.params;

			if (!projectId) {
				throw HttpError.badRequest('Project ID is required');
			}

			id.parse(projectId);
			const payload = projectPayloadSchema.parse(request.body);

			const project = await this.updateProjectUseCase.execute(
				projectId,
				payload
			);

			return {
				status: 'success',
				status_code: 200,
				message: 'Project updated successfully',
				data: { project },
			};
		} catch (error) {
			if (
				error instanceof ProjectUseCaseErrors.NotFound ||
				error instanceof TechUseCaseErrors.NotFound
			) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
