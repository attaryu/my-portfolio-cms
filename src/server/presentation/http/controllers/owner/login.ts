import type { IOwnerLoginUseCase } from '@/server/app/use-cases/owner/login';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { serverError } from '../../helper/server-error';

export class OwnerLoginController implements IController {
	constructor(private readonly _ownerLoginUseCase: IOwnerLoginUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const token = await this._ownerLoginUseCase.execute(
				request.body.email as string,
				request.body.password as string
			);

			request.cookies.set('ACCESS_TOKEN', token.accessToken.value, {
				maxAge: token.accessToken.expiresIn,
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
			});

			request.cookies.set('REFRESH_TOKEN', token.refreshToken.value, {
				maxAge: token.refreshToken.expiresIn,
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
			});

			return {
				status: 200,
				data: {
					message: 'Authentication successful',
				},
			};
		} catch (error: any) {
			console.error(error);

			if (error instanceof OwnerUseCaseErrors.InvalidCredentials) {
				return {
					status: 400,
					error: error.message,
				};
			}

			return serverError();
		}
	}
}
