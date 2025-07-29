import type { IOwnerLoginUseCase } from '@/server/app/use-cases/owner/login';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { HttpError } from '../../helper/http-error';
import { ownerLoginPayload } from '../../validations/owner/login';

export class OwnerLoginController implements IController {
	constructor(private readonly ownerLoginUseCase: IOwnerLoginUseCase) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const { email, password } = ownerLoginPayload.parse(request.body);
			const token = await this.ownerLoginUseCase.execute(email, password);

			request.cookies.set('REFRESH_TOKEN', token.refreshToken.value, {
				maxAge: token.refreshToken.expireIn,
				...(process.env.NODE_ENV === 'production'
					? {
							httpOnly: true,
							secure: true,
							sameSite: 'strict',
					  }
					: undefined),
			});

			return {
				status_code: 200,
				status: 'success',
				message: 'Authentication successful',
				data: {
					access_token: token.accessToken.value,
				},
			};
		} catch (error) {
			if (error instanceof OwnerUseCaseErrors.InvalidCredentials) {
				throw HttpError.unauthorized(error.message);
			}

			throw error;
		}
	}
}
