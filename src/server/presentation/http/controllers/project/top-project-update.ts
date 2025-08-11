import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';
import { ITopProjectUpdateUseCase } from '@/server/app/use-cases/project/top-project-update';
import { HTTPRequest } from '../../helper/create-http-request';
import { HttpError } from '../../helper/http-error';
import { IResponse } from '../../types/response';
import { topProjectPayloadSchema } from '../../validations/project/top-project-payload';
import { IController } from '../controller';

export class TopProjectUpdateController implements IController {
	constructor(
		private readonly topProjectUpdateUseCase: ITopProjectUpdateUseCase
	) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const payload = topProjectPayloadSchema.parse(request.body);
			await this.topProjectUpdateUseCase.execute(payload);

			return {
				status_code: 200,
				status: 'success',
				message: 'Top project updated successfully',
			};
		} catch (error) {
			if (
				error instanceof ProjectUseCaseErrors.SomeIdsNotFound ||
				error instanceof OwnerUseCaseErrors.NotFound
			) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
