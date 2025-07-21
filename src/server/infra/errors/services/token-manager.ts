import { InfraError } from '../infra-error';

export namespace TokenManagerErrors {
	export class SecretNotDefined extends InfraError {
		constructor() {
			super('JWT secret is not defined in environment variables');
		}
	}

	export class InvalidToken extends InfraError {
		constructor() {
			super('Invalid token');
		}
	}
}
