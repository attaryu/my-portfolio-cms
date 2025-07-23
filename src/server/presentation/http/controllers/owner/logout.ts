import type { IOwnerLogoutUseCase } from '@/server/app/use-cases/owner/logout';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { TokenManagerErrors } from '@/server/infra/errors/services/token-manager';

import { HttpError } from '../../helper/http-error';

export class OwnerLogoutController implements IController {
	constructor(private readonly _ownerLogoutUseCase: IOwnerLogoutUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		const refreshToken = request.cookies.get('REFRESH_TOKEN')?.value;

		if (!refreshToken) {
			return {
				statusCode: 400,
				status: 'fail',
				message: 'No refresh token provided',
			};
		}

		try {
			await this._ownerLogoutUseCase.execute(refreshToken);

			request.cookies.delete('REFRESH_TOKEN');
			request.cookies.delete('ACCESS_TOKEN');

			return {
				statusCode: 200,
				status: 'success',
				message: 'Logout successful',
			};
		} catch (error: any) {
			console.error(error);

			if (error instanceof OwnerUseCaseErrors.DifferentRefreshToken) {
				throw HttpError.forbidden(error.message);
			}

			if (error instanceof TokenManagerErrors.InvalidToken) {
				throw HttpError.unauthorized(error.message);
			}

			if (error instanceof OwnerUseCaseErrors.NotFound) {
				throw HttpError.notFound(error.message);
			}

			throw HttpError.internalServerError();
		}
	}
}
