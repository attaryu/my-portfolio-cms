import { ApplicationError } from '../app-error';

class NotFound extends ApplicationError {
	constructor() {
		super('Owner not found');
	}
}

class InvalidCredentials extends ApplicationError {
	constructor() {
		super('Invalid email or password');
	}
}

class InvalidToken extends ApplicationError {
	constructor(tokenType: string) {
		super(`Invalid ${tokenType} token`);
	}
}

export const OwnerUseCaseErrors = {
	NotFound,
	InvalidCredentials,
	InvalidToken,
};
