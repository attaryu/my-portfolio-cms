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
		private _cover_url: string,
		private _description?: string,
		private _techs?: TechEntity[],
		private _main_links?: MainLink[],
		private _other_links?: OtherLink[],
		private _created_at?: Date,
		private _updated_at?: Date
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
			cover_url,
			description,
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
		return this._main_links!;
	}

	get otherLinks() {
		return this._other_links;
	}

	get createdAt() {
		return this._created_at;
	}

	get updatedAt() {
		return this._updated_at;
	}

	set title(value: string) {
		this._title = value;
	}

	set shortDescription(value: string) {
		this._short_description = value;
	}

	set description(value: string | undefined) {
		this._description = value;
	}

	set coverUrl(value: string) {
		this._cover_url = value;
	}

	set techs(value: TechEntity[] | undefined) {
		this._techs = value;
	}

	set mainLinks(value: IMainLink[]) {
		this._main_links = value.map((link) =>
			MainLink.create(link.url, link.type)
		);
	}

	set otherLinks(value: IOtherLink[] | undefined) {
		this._other_links = value?.map((link) =>
			OtherLink.create(link.title, link.url, link.order)
		);
	}
}
