import z from 'zod';

export const baseId = z.uuid();

export const createMultipleIdsSchema = (resource: string) =>
	z
		.array(baseId)
		.min(1, `At least one ${resource} is required`)
		.max(25, `A maximum of 25 ${resource} is allowed`)
		.refine((ids) => new Set(ids).size === ids.length, {
			error: `${resource} IDs must be unique`,
			path: [`${resource}Ids`],
		});
