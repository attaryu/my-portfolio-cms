import type { IGetProjectUseCase } from '@/server/app/use-cases/project/get';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';
import { HttpError } from '../../helper/http-error';

export class GetProjectController implements IController {
	constructor(private readonly getProjectUseCase: IGetProjectUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const project = await this.getProjectUseCase.execute(
				request.params.projectId
			);

			return {
				message: 'Project retrieved successfully',
				status_code: 200,
				status: 'success',
				data: { project },
			};
		} catch (error) {
			if (error instanceof ProjectUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
