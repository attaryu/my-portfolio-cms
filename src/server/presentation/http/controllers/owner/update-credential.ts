import type { IUpdateOwnerCredentialUseCase } from '@/server/app/use-cases/owner/update-credential';
import type { HTTPRequest } from '../../helper/create-http-request';
import type { IResponse } from '../../types/response';
import type { IController } from '../controller';

import { PasswordErrors } from '@/server/domain/errors/value-objects/password';

import { HttpError } from '../../helper/http-error';
import { ownerCredentialPayloadSchema } from '../../validations/owner/credential-payload';

export class IUpdateOwnerCredentialController implements IController {
	constructor(
		private readonly updateOwnerCredentialUseCase: IUpdateOwnerCredentialUseCase
	) {}

	async handle(request: HTTPRequest): Promise<IResponse> {
		try {
			const payload = ownerCredentialPayloadSchema.parse(request.body);
			await this.updateOwnerCredentialUseCase.execute(payload);

			request.cookies.delete('REFRESH_TOKEN');

			return {
				status: 'success',
				status_code: 200,
				message: 'Owner credentials updated successfully, please login again',
			};
		} catch (error) {
			if (error instanceof PasswordErrors.DoesNotMatch) {
				throw HttpError.badRequest('Previous password does not match');
			}

			throw error;
		}
	}
}
