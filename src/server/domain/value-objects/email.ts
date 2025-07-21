import { DomainError } from '../errors/domain-error';

export class Email {
	constructor(private readonly _value: string) {}

	get value(): string {
		return this._value;
	}

	public isSame(email: string): boolean {
		if (email !== this._value) {
			throw new DomainError('Invalid email format');
		}

		return true;
	}

	static create(email: string): Email {
		return new Email(email);
	}
}
