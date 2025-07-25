import { InfraError } from '../infra-error';

class SecretNotDefined extends InfraError {
	constructor() {
		super('JWT secret is not defined in environment variables');
	}
}

export const TokenManagerErrors = {
	SecretNotDefined,
};
