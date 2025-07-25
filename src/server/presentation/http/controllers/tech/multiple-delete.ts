import type { IMultipleDeleteTechsUseCase } from '@/server/app/use-cases/techs/multiple-delete';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { multipleDeleteTechPayload } from '../../validations/tech/delete-payload';

export class MultipleDeleteTechsController implements IController {
	constructor(
		private readonly multipleDeleteTechUseCase: IMultipleDeleteTechsUseCase
	) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		const { ids } = multipleDeleteTechPayload.parse(request.body);
		await this.multipleDeleteTechUseCase.execute(ids);

		return {
			status_code: 200,
			status: 'success',
			message: 'Technologies deleted successfully',
		};
	}
}
