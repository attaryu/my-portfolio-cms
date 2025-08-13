import type { IMainLink } from '@/server/domain/value-objects/main-link';

export interface ILandingOutDTO {
	email: string;
	address?: string | null;
	cover_url?: string | null;
	about?: string | null;
	updated_at: Date;
	social_media: {
		id: string;
		name: string;
		url: string;
	}[];
	top_project: {
		id: string;
		title: string;
		short_description: string;
		cover_url: string;
		created_at: Date;
		main_links: IMainLink[];
		techs: string[];
	}[];
}
