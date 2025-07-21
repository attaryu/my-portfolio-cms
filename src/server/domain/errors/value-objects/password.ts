import { DomainError } from '../domain-error';

export namespace PasswordError {
	export class DoesNotMatch extends DomainError {
		constructor() {
			super('Password does not match.');
		}
	}
}
