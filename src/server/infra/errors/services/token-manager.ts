import { InfraError } from '../infra-error';

class SecretNotDefined extends InfraError {
	constructor() {
		super('JWT secret key is not defined');
	}
}

export const TokenManagerErrors = {
	SecretNotDefined,
};
