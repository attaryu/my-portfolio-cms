import type { IOwnerLogoutUseCase } from '@/server/app/use-cases/owner/logout';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { TokenManagerErrors } from '@/server/infra/errors/services/token-manager';

import { serverError } from '../../helper/server-error';

export class OwnerLogoutController implements IController {
	constructor(private readonly _ownerLogoutUseCase: IOwnerLogoutUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		const refreshToken = request.cookies.get('REFRESH_TOKEN')?.value;

		if (!refreshToken) {
			return {
				status: 400,
				error: 'No request token provided',
			};
		}

		try {
			await this._ownerLogoutUseCase.execute(refreshToken);

			request.cookies.delete('REFRESH_TOKEN');
			request.cookies.delete('ACCESS_TOKEN');

			return {
				status: 204,
			};
		} catch (error: any) {
			console.error(error);

			if (error instanceof OwnerUseCaseErrors.DifferentRefreshToken) {
				return {
					status: 400,
					error: error.message,
				};
			}

			if (error instanceof TokenManagerErrors.InvalidToken) {
				return {
					status: 401,
					error: error.message,
				};
			}

			if (error instanceof OwnerUseCaseErrors.NotFound) {
				return {
					status: 404,
					error: error.message,
				};
			}

			return serverError(error);
		}
	}
}
