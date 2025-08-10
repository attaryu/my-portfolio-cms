import z from 'zod';

export const ownerPublicInfoPayloadSchema = z.object({
	contact_email: z.email(),
	address: z.string().min(10).max(100),
	cover_url: z.url(),
	about: z.string().min(10).max(500),
	social_media: z
		.array(
			z.object({
				name: z.string().min(2).max(100),
				url: z.url(),
			})
		)
		.min(1)
		.max(5),
});
