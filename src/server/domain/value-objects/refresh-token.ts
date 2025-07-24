import { RefreshTokenErrors } from '../errors/value-objects/refresh-token';

export class RefreshToken {
	constructor(private readonly _value: string | undefined) {}

	get value(): string | undefined {
		return this._value;
	}

	isExist() {
		if (this._value === undefined || this._value === null) {
			throw new RefreshTokenErrors.NotFound();
		}
	}

	isSameAs(otherRefreshToken: string | undefined): void {
		if (otherRefreshToken !== this._value) {
			throw new RefreshTokenErrors.NotSame();
		}
	}

	static create(value: string | undefined): RefreshToken {
		return new RefreshToken(value);
	}
}
