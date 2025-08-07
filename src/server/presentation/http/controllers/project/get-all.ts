import { GeneralAppError } from '@/server/app/errors/app-error';
import { IGetAllProjectsUseCase } from '@/server/app/use-cases/project/get-all';
import { HTTPRequest } from '../../helper/create-http-request';
import { HttpError } from '../../helper/http-error';
import { IResponse } from '../../types/response';
import { paginationQueryParameter } from '../../validations/pagination-query-parameter';
import { IController } from '../controller';

export class GetAllProjectsController implements IController {
	constructor(private readonly getAllProjectsUseCase: IGetAllProjectsUseCase) {}

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

			const queryParameter = paginationQueryParameter([
				'title',
				'short_description',
				'created_at',
				'updated_at',
			]).parse({
				search: request.url.searchParams.get('search'),
				page: page ? parseInt(page, 10) : undefined,
				limit: limit ? parseInt(limit, 10) : undefined,
				order: request.url.searchParams.get('order'),
				sort: request.url.searchParams.get('sort'),
			});

			const { data, pagination } = await this.getAllProjectsUseCase.execute(
				queryParameter
			);

			return {
				status_code: 200,
				status: 'success',
				message: 'Projects retrieved successfully',
				data: { projects: data },
				pagination,
			};
		} catch (error) {
			if (error instanceof GeneralAppError.BiggerPageIndex) {
				throw HttpError.badRequest(error.message);
			}

			throw error;
		}
	}
}
