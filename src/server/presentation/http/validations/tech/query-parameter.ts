import { IFilterDTO } from '@/server/app/dtos/filter';
import z from 'zod';

export const techQueryParameter = z
	.object({
		search: z.string().optional().nullable(),
		page: z.number().min(1).optional().nullable(),
		limit: z.number().min(1).max(50).optional().nullable(),
		order: z
			.enum(
				// always check the latest field names in the database
				['name', 'created_at', 'updated_at']
			)
			.optional()
			.nullable(),
		sort: z.enum(['asc', 'desc']).optional().nullable(),
	})
	.refine(
		// Ensure that 'order' and 'sort' are provided together
		({ sort, order }) => {
			if (!order && !sort) {
				return true;
			}

			return order && sort;
		},
		{
			error: 'Order and sort must be provided together',
			path: ['order', 'sort'],
		}
	)
	.transform<IFilterDTO>((data) => ({
		search: data.search ?? undefined,
		page: data.page ?? undefined,
		limit: data.limit ?? undefined,
		orderBy:
			data.order && data.sort
				? { field: data.order, direction: data.sort }
				: undefined,
	}));
