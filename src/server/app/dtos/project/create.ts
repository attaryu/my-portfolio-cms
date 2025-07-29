export interface ICreateProjectDTO {
	title: string;
	short_description: string;
	description: string;
	cover_url: string;
	techs: string[];
	main_links: {
		url: string;
		type: 'FEEDBACK' | 'LIVE_PRODUCTION';
	}[];
	other_links?: {
		title: string;
		url: string;
		order: number;
	}[];
}
