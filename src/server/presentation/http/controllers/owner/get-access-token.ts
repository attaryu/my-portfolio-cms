import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import type { IOwnerGetAccessTokenUseCase } from '@/server/app/use-cases/owner/get-access-token';
import { TokenManagerErrors } from '@/server/infra/errors/services/token-manager';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { HttpError } from '../../helper/http-error';

export class OwnerGetAccessTokenController implements IController {
	constructor(
		private readonly _getAccessTokenUseCase: IOwnerGetAccessTokenUseCase
	) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const refreshToken = request.cookies.get('REFRESH_TOKEN')?.value;

			if (!refreshToken) {
				return {
					statusCode: 401,
					status: 'fail',
					message: 'No refresh token provided',
				};
			}

			const accessToken = await this._getAccessTokenUseCase.execute(
				refreshToken
			);

			request.cookies.set('ACCESS_TOKEN', accessToken.value, {
				maxAge: accessToken.expiresIn,
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
			});

			return {
				statusCode: 200,
				status: 'success',
				message: 'Access token retrieved successfully',
			};
		} catch (error) {
			if (
				error instanceof OwnerUseCaseErrors.DifferentRefreshToken ||
				error instanceof TokenManagerErrors.InvalidToken
			) {
				throw HttpError.unauthorized(error.message);
			}

			throw HttpError.internalServerError();
		}
	}
}
