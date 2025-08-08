import type { IMultipleDeleteProjectsUseCase } from '@/server/app/use-cases/project/multiple-delete';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';

import { HttpError } from '../../helper/http-error';
import { multipleDeleteProjectPayload } from '../../validations/project/multiple-delete';

export class MultipleDeleteProjectsController implements IController {
	constructor(
		private readonly multipleDeleteProjectUseCase: IMultipleDeleteProjectsUseCase
	) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const { projectIds } = multipleDeleteProjectPayload.parse(request.body);

			await this.multipleDeleteProjectUseCase.execute(projectIds);

			return {
				status_code: 200,
				status: 'success',
				message: 'Multiple projects deleted successfully',
			};
		} catch (error) {
			if (error instanceof ProjectUseCaseErrors.SomeIdsNotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
