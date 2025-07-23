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

	export class InvalidToken extends ApplicationError {
		constructor() {
			super('Invalid or expired token');
		}
	}
}
