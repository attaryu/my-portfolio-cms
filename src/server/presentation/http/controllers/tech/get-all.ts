import type { IGetAllTechsUseCase } from '@/server/app/use-cases/techs/get-all';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { HttpError } from '../../helper/http-error';
import { techQueryParameter } from '../../validations/tech/query-parameter';

export class GetAllTechsController implements IController {
	constructor(private readonly getAllTechsUseCase: IGetAllTechsUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const page = request.url.searchParams.get('page');
			const limit = request.url.searchParams.get('limit');

			if (page && !/^-?\d+$/.test(page)) {
				throw HttpError.badRequest('Invalid page query parameter');
			}

			if (limit && !/^-?\d+$/.test(limit)) {
				throw HttpError.badRequest('Invalid limit query parameter');
			}

			const queryParameter = techQueryParameter.parse({
				search: request.url.searchParams.get('search'),
				page: page ? parseInt(page, 10) : undefined,
				limit: limit ? parseInt(limit, 10) : undefined,
				order: request.url.searchParams.get('order'),
				sort: request.url.searchParams.get('sort'),
			});

			const result = await this.getAllTechsUseCase.execute(queryParameter);

			return {
				statusCode: 200,
				status: 'success',
				message: 'Techs retrieved successfully',
				data: { techs: result.data },
				pagination: result.pagination,
			};
		} catch (error) {
			if (error instanceof TechUseCaseErrors.BiggerPageIndex) {
				throw HttpError.badRequest(error.message);
			}

			throw error;
		}
	}
}
