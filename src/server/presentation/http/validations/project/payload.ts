import z from 'zod';

export const projectPayloadSchema = z.object({
	title: z.string(),
	short_description: z.string(),
	description: z.string(),
	cover_url: z.url('Cover URL must be a valid URL'),
	techs: z.array(z.string()).min(1, 'At least one technology is required'),

	main_links: z
		.array(
			z.object({
				url: z.url('Main link must be a valid URL'),
				type: z.enum(['FEEDBACK', 'LIVE_PRODUCTION']),
			})
		)
		.length(2, 'There must be exactly two main links'),

	other_links: z
		.array(
			z.object({
				title: z.string().min(1, 'Other link title is required'),
				url: z.url('Other link must be a valid URL'),
				order: z
					.number()
					.int()
					.nonnegative('Order must be a non-negative integer'),
			})
		)
		.optional(),
});
