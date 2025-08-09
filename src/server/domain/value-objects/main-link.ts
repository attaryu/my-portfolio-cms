import { MainLinkErrors } from '../errors/value-objects/main-link';

export interface IMainLink {
	id?: string;
	url: string;
	type: 'FEEDBACK' | 'LIVE_PRODUCTION';
}

export class MainLink {
	constructor(
		private _id: string | undefined,
		private _url: string,
		private _type: IMainLink['type']
	) {}

	static create(url: string, type: string): MainLink {
		if (type !== 'FEEDBACK' && type !== 'LIVE_PRODUCTION') {
			throw new MainLinkErrors.InvalidType();
		}

		return new MainLink(undefined, url, type);
	}

	get id() {
		return this._id;
	}

	get url() {
		return this._url;
	}

	get type() {
		return this._type;
	}
}
