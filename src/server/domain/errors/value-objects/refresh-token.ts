import { DomainError } from '../domain-error';

export namespace RefreshTokenErrors {
	export class Invalid extends DomainError {
		constructor() {
			super('Refresh token is not string');
		}
	}

	export class NotSame extends DomainError {
		constructor() {
			super('Refresh token does not match');
		}
	}

	export class NotFound extends DomainError {
		constructor() {
			super('Refresh token not found');
		}
	}
}
