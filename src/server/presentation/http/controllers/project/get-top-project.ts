import type { IGetTopProjectUseCase } from '@/server/app/use-cases/project/get-top-project';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

export class GetTopProjectController implements IController {
	constructor(private readonly getTopProjectUseCase: IGetTopProjectUseCase) {}

	async handle(): Promise<IResponse> {
		const projects = await this.getTopProjectUseCase.execute();

		return {
			status_code: 200,
			status: 'success',
			message: 'Projects retrieved successfully',
			data: { projects },
		};
	}
}
