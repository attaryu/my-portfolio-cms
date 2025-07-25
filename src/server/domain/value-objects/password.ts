import type { IHashing } from '@/server/app/services/hashing';

import { PasswordErrors } from '../errors/value-objects/password';

export class Password {
	constructor(private readonly _value: string) {}

	get value(): string {
		return this._value;
	}

	public async isSame(
		incomingPassword: string,
		hashing: IHashing
	): Promise<boolean> {
		if (await hashing.verifyHash(incomingPassword, this._value)) {
			return true;
		}

		throw new PasswordErrors.DoesNotMatch();
	}

	static create(password: string): Password {
		return new Password(password);
	}
}
