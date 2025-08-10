export interface IOwnerPublicInfoOutDTO {
	contact_email: string | null;
	address: string | null;
	cover_url: string | null;
	about: string | null;
	social_media: {
		id: string;
		name: string;
		url: string;
	}[];
}
