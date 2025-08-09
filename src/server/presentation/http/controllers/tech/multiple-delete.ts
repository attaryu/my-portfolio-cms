import type { IMultipleDeleteTechsUseCase } from '@/server/app/use-cases/techs/multiple-delete';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { HttpError } from '../../helper/http-error';
import { multipleDeleteTechPayload } from '../../validations/tech/delete-payload';

export class MultipleDeleteTechsController implements IController {
	constructor(
		private readonly multipleDeleteTechUseCase: IMultipleDeleteTechsUseCase
	) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const { techIds } = multipleDeleteTechPayload.parse(request.body);
			await this.multipleDeleteTechUseCase.execute(techIds);

			return {
				status_code: 200,
				status: 'success',
				message: 'Technologies deleted successfully',
			};
		} catch (error) {
			if (error instanceof TechUseCaseErrors.SomeIdsNotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
