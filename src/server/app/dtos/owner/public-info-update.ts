export interface IOwnerPublicInfoPayloadDTO {
	contact_email: string;
	address: string;
	cover_url: string;
	about: string;
	social_media: {
		name: string;
		url: string;
	}[];
}
