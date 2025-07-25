export interface ITech {
	id: string;
	name: string;
	logoUrl: string;
	createdAt: Date;
	updatedAt: Date;
}

export class TechEntity {
	constructor(
		public readonly _id: string | null,
		public _name: string,
		public _logoUrl: string,
		public readonly _createdAt: Date | null,
		public readonly _updatedAt: Date | null
	) {}

	static create(tech: { name: string; logoUrl: string }): TechEntity {
		return new TechEntity(null, tech.name, tech.logoUrl, null, null);
	}

	get id(): string | null {
		return this._id;
	}

	get name(): string {
		return this._name;
	}

	get logoUrl(): string {
		return this._logoUrl;
	}

	get createdAt(): Date | null {
		return this._createdAt;
	}

	get updatedAt(): Date | null {
		return this._updatedAt;
	}

	set name(name: string) {
		this._name = name;
	}

	set logoUrl(logoUrl: string) {
		this._logoUrl = logoUrl;
	}
}
