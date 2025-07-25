import type { IOwnerLoginUseCase } from '@/server/app/use-cases/owner/login';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { HttpError } from '../../helper/http-error';
import { ownerLoginPayload } from '../../validations/owner/login';

export class OwnerLoginController implements IController {
	constructor(private readonly _ownerLoginUseCase: IOwnerLoginUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const { email, password } = ownerLoginPayload.parse(request.body);
			const token = await this._ownerLoginUseCase.execute(email, password);

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
				statusCode: 200,
				status: 'success',
				message: 'Authentication successful',
			};
		} catch (error) {
			if (error instanceof OwnerUseCaseErrors.InvalidCredentials) {
				throw HttpError.unauthorized(error.message);
			}

			throw error;
		}
	}
}
