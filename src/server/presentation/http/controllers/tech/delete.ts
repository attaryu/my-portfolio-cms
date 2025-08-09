import type { IDeleteTechUseCase } from '@/server/app/use-cases/techs/delete';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { HttpError } from '../../helper/http-error';
import { id } from '../../validations/id';

export class DeleteTechController implements IController {
	constructor(private readonly deleteTechUseCase: IDeleteTechUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const { techId } = request.params;

			if (!techId) {
				throw HttpError.badRequest('Tech ID is required');
			}
			
			id.parse(techId);

			await this.deleteTechUseCase.execute(techId);

			return {
				status_code: 200,
				message: 'Tech deleted successfully',
				status: 'success',
			};
		} catch (error) {
			if (error instanceof TechUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
