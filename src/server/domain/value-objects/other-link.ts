export interface IOtherLink {
	id?: string;
	title: string;
	url: string;
	domain?: string;
	order: number;
}

export class OtherLink {
	constructor(
		private _id: string | undefined,
		private _title: string,
		private _url: string,
		private _domain: string,
		private _order: number
	) {}

	static create(title: string, url: string, order: number): OtherLink {
		const domainPattern = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;

		const domainMatch = url.match(domainPattern);
		const domain = domainMatch ? domainMatch[1] : '';

		return new OtherLink(undefined, title, url, domain, order);
	}

	get id() {
		return this._id;
	}

	get title() {
		return this._title;
	}

	get url() {
		return this._url;
	}

	get domain() {
		return this._domain;
	}

	get order() {
		return this._order;
	}
}
