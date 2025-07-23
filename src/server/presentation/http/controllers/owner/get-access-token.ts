import type { IOwnerGetAccessTokenUseCase } from '@/server/app/use-cases/owner/get-access-token';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { RefreshTokenErrors } from '@/server/domain/errors/value-objects/refresh-token';
import { HttpError } from '../../helper/http-error';

export class OwnerGetAccessTokenController implements IController {
	constructor(
		private readonly _getAccessTokenUseCase: IOwnerGetAccessTokenUseCase
	) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const refreshToken = request.cookies.get('REFRESH_TOKEN')?.value;

			if (!refreshToken) {
				throw HttpError.unauthorized('No refresh token provided');
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
				error instanceof OwnerUseCaseErrors.InvalidToken ||
				error instanceof RefreshTokenErrors.NotSame
			) {
				throw HttpError.unauthorized(error.message);
			}

			throw error;
		}
	}
}
