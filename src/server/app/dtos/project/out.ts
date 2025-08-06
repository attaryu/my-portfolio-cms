import type { ITechOut } from '../tech/out';

export interface IProjectOutDTO {
  id: string;
	title: string;
	short_description: string;
	description: string;
	cover_url: string;
	techs: ITechOut[];
	main_links: {
		id: string;
		url: string;
		type: 'FEEDBACK' | 'LIVE_PRODUCTION';
	}[];
	other_links?: {
		id: string;
		title: string;
		url: string;
		order: number;
	}[];
}
