import type { IOwnerLogoutUseCase } from '@/server/app/use-cases/owner/logout';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';

import { RefreshTokenErrors } from '@/server/domain/errors/value-objects/refresh-token';
import { HttpError } from '../../helper/http-error';

export class OwnerLogoutController implements IController {
	constructor(private readonly _ownerLogoutUseCase: IOwnerLogoutUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const refreshToken = request.cookies.get('REFRESH_TOKEN')?.value;

			if (!refreshToken) {
				throw HttpError.unauthorized('No refresh token provided');
			}

			await this._ownerLogoutUseCase.execute(refreshToken);

			request.cookies.delete('REFRESH_TOKEN');
			request.cookies.delete('ACCESS_TOKEN');

			return {
				statusCode: 200,
				status: 'success',
				message: 'Logout successful',
			};
		} catch (error) {
			if (
				error instanceof OwnerUseCaseErrors.InvalidToken ||
				error instanceof RefreshTokenErrors.NotSame
			) {
				throw HttpError.unauthorized(error.message);
			}

			if (error instanceof OwnerUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			throw error;
		}
	}
}
