import { IFilterTechs } from '@/server/app/use-cases/techs/get-all';
import z from 'zod';

export const techQueryParameter = z
	.object({
		search: z.string().optional().nullable(),
		page: z.number().min(1).optional().nullable(),
		limit: z.number().min(1).max(50).optional().nullable(),
		orderByField: z.string().optional().nullable(),
		orderByDirection: z.enum(['asc', 'desc']).optional().nullable(),
	})
	.refine(
		({ orderByDirection, orderByField }) => {
			if (!orderByField && !orderByDirection) {
				return true;
			}

			return orderByField && orderByDirection;
		},
		{
			error: 'Order by field and direction must be provided together',
			path: ['orderByField', 'orderByDirection'],
		}
	)
	.transform<IFilterTechs>((data) => ({
		search: data.search ?? undefined,
		page: data.page ?? undefined,
		limit: data.limit ?? undefined,
		orderBy:
			data.orderByField && data.orderByDirection
				? { field: data.orderByField, direction: data.orderByDirection }
				: undefined,
	}));
