import type { IClearTopProjectUseCase } from '@/server/app/use-cases/project/clear-top-project';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

export class ClearTopProjectController implements IController {
	constructor(
		private readonly clearTopProjectUseCase: IClearTopProjectUseCase
	) {}

	async handle(): Promise<IResponse> {
		await this.clearTopProjectUseCase.execute();

		return {
			status_code: 200,
			status: 'success',
			message: 'Top projects cleared successfully',
		};
	}
}
