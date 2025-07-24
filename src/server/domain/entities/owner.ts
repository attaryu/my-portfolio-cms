import { Email } from '../value-objects/email';
import { Password } from '../value-objects/password';
import { RefreshToken } from '../value-objects/refresh-token';

export interface IOwner {
	id: string;
	email: string;
	password: string;
	address: string;
	coverUrl: string;
	refreshToken?: string;
	createdAt: string;
	updatedAt: string;
}

export class OwnerEntity {
	constructor(
		public readonly _id: string | null,
		public _email: Email,
		public _password: Password,
		public _address: string,
		public _coverUrl: string,
		public _refreshToken: RefreshToken,
		public _createdAt: Date | null,
		public _updatedAt: Date | null
	) {}

	static create(owner: IOwner): OwnerEntity {
		const now = new Date();

		return new OwnerEntity(
			null,
			Email.create(owner.email),
			Password.create(owner.password),
			owner.address,
			owner.coverUrl,
			RefreshToken.create(owner.refreshToken),
			now,
			now
		);
	}

	get id(): string | null {
		return this._id;
	}

	get email(): Email {
		return this._email;
	}

	get password(): Password {
		return this._password;
	}

	get address(): string {
		return this._address;
	}

	get coverUrl(): string {
		return this._coverUrl;
	}

	get refreshToken(): RefreshToken {
		return this._refreshToken;
	}

	get createdAt(): Date | null {
		return this._createdAt;
	}

	get updatedAt(): Date | null {
		return this._updatedAt;
	}

	set refreshToken(refreshToken: string | undefined) {
		this._refreshToken = RefreshToken.create(refreshToken);
	}
}
