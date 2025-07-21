import { ApplicationError } from '../app-error';

export namespace OwnerUseCaseErrors {
	export class NotFound extends ApplicationError {
		constructor() {
			super('Owner not found');
		}
	}

	export class InvalidCredentials extends ApplicationError {
		constructor() {
			super('Invalid email or password');
		}
	}

	export class DifferentRefreshToken extends ApplicationError {
		constructor() {
			super('Refresh token is different from the current one');
		}
	}
}
