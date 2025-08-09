import type { IDeleteProjectUseCase } from '@/server/app/use-cases/project/delete';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';
import { HttpError } from '../../helper/http-error';
import { id } from '../../validations/id';

export class DeleteProjectController implements IController {
	constructor(private readonly deleteProjectUseCase: IDeleteProjectUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const { projectId } = request.params;

			if (!projectId) {
				throw HttpError.badRequest('Project ID is required');
			}

			id.parse(projectId);

			await this.deleteProjectUseCase.execute(projectId);

			return {
				status_code: 200,
				message: 'Project deleted successfully',
				status: 'success',
			};
		} catch (error) {
			if (error instanceof ProjectUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
