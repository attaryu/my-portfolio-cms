export interface IOwnerPublicInfoOutDTO {
	id: string;
	contact_email: string;
	address: string;
	cover_url: string;
	about: string;
	social_media: {
		id: string;
		name: string;
		url: string;
	}[];
}
