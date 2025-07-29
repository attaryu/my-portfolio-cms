import { IMainLink, MainLink } from '../value-objects/main-link';
import { IOtherLink, OtherLink } from '../value-objects/other-link';
import type { TechEntity } from './tech';

export interface IProject {
	id?: string;
	title: string;
	short_description: string;
	description: string;
	cover_url: string;
	techs: string[];
	main_links: IMainLink[];
	other_links?: IOtherLink[];
}

export class ProjectEntity {
	constructor(
		private readonly _id: string | undefined,
		private _title: string,
		private _short_description: string,
		private _description: string,
		private _cover_url: string,
		private _techs: TechEntity[],
		private _main_links: MainLink[],
		private _other_links?: OtherLink[]
	) {}

	static create(
		title: string,
		short_description: string,
		description: string,
		cover_url: string,
		techs: TechEntity[],
		main_links: IMainLink[],
		other_links?: IOtherLink[]
	) {
		const mainLinks = main_links.map((link) =>
			MainLink.create(link.url, link.type)
		);

		const otherLinks = other_links?.map((link) =>
			OtherLink.create(link.title, link.url, link.order)
		);

		return new ProjectEntity(
			undefined,
			title,
			short_description,
			description,
			cover_url,
			techs,
			mainLinks,
			otherLinks
		);
	}

	get id() {
		return this._id;
	}

	get title() {
		return this._title;
	}

	get short_description() {
		return this._short_description;
	}

	get description() {
		return this._description;
	}

	get coverUrl() {
		return this._cover_url;
	}

	get techs() {
		return this._techs;
	}

	get mainLinks() {
		return this._main_links;
	}

	get otherLinks() {
		return this._other_links;
	}
}
