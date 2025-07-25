import { DomainError } from '../domain-error';

class DoesNotMatch extends DomainError {
	constructor() {
		super('Password does not match');
	}
}

export const PasswordErrors = {
	DoesNotMatch,
};
