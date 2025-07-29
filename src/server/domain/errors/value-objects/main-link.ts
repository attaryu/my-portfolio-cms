import { DomainError } from '../domain-error';

class InvalidType extends DomainError {
	constructor() {
		super('Type must be either FEEDBACK or LIVE_PRODUCTION');
	}
}

export const MainLinkErrors = {
	InvalidType,
};
