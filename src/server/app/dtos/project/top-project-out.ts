import { IMainLink } from '@/server/domain/value-objects/main-link';

export interface ITopProjectOutDTO {
	id: string;
	title: string;
	short_description: string;
	cover_url: string;
	created_at: string;
	techs: string[];
	main_links: IMainLink[];
}
