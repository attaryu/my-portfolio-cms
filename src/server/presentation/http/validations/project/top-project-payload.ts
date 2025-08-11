import z from 'zod';

import { id } from '../id';

export const topProjectPayloadSchema = z.object({
	projects: z
		.array(
			z.object({
				id,
				order: z.number().int().min(0),
			})
		)
		.length(3)
		.refine(
			(data) => new Set(data.map((item) => item.id)).size === data.length,
			{
				message: 'Project IDs must be unique',
				path: ['projects', 'id'],
			}
		),
});
