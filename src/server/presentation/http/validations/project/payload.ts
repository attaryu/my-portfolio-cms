import z from 'zod';

export const projectPayloadSchema = z.object({
	title: z.string().max(100, 'Title must be at most 100 characters long'),
	short_description: z
		.string()
		.max(300, 'Short description must be at most 300 characters long'),
	description: z.string(),
	cover_url: z.url('Cover URL must be a valid URL'),
	techs: z
		.array(z.string())
		.min(1, 'At least one technology is required')
		.max(25, 'A maximum of 25 technologies is allowed'),

	main_links: z
		.array(
			z.object({
				url: z.url('Main link must be a valid URL'),
				type: z.enum(['FEEDBACK', 'LIVE_PRODUCTION']),
			})
		)
		.max(2, 'A maximum of 2 main links is allowed')
		.refine((links) => links.some(({ type }) => type === 'LIVE_PRODUCTION'), {
			error: 'At least one main link must be of type LIVE_PRODUCTION',
			path: ['main_links'],
		})
		.refine(
			(links) => {
				const feedback = links.filter(({ type }) => type === 'FEEDBACK');
				const liveProduction = links.filter(
					({ type }) => type === 'LIVE_PRODUCTION'
				);

				return feedback.length <= 1 && liveProduction.length <= 1;
			},
			{
				error: 'Each type of main link can only appear once',
				path: ['main_links'],
			}
		),

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
		.max(10, 'A maximum of 10 other links is allowed')
		.optional(),
});
