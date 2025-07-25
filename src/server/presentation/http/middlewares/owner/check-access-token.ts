import type { ICheckOwnerAccessTokenUseCase } from '@/server/app/use-cases/owner/check-access-token';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IMiddleware, Next } from '../middleware';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { HttpError } from '../../helper/http-error';

export class CheckOwnerAccessTokenMiddleware implements IMiddleware {
	constructor(
		private readonly _CheckOwnerAccessTokenUseCase: ICheckOwnerAccessTokenUseCase
	) {}

	async handle(request: HTTPRequest, next: Next): Promise<IResponse> {
		try {
			const accessToken = request.cookies.get('ACCESS_TOKEN')?.value;

			if (!accessToken) {
				throw HttpError.unauthorized('Access token is missing');
			}

			const result = await this._CheckOwnerAccessTokenUseCase.execute(
				accessToken
			);

			if (!result) {
				throw HttpError.unauthorized('Access token is invalid');
			}

			return await next(request);
		} catch (error) {
			if (error instanceof OwnerUseCaseErrors.InvalidToken) {
				throw HttpError.unauthorized(error.message);
			}

			throw error;
		}
	}
}
