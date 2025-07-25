import { DomainError } from '../domain-error';

class Invalid extends DomainError {
	constructor() {
		super('Refresh token is not string');
	}
}

class NotSame extends DomainError {
	constructor() {
		super('Refresh token does not match');
	}
}

class NotFound extends DomainError {
	constructor() {
		super('Refresh token not found');
	}
}

export const RefreshTokenErrors = {
	Invalid,
	NotSame,
	NotFound,
};
