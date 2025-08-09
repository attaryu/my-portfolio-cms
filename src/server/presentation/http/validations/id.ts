import z from 'zod';

export const id = z.uuid();

export const createMultipleIdsSchema = (resource: string) =>
	z
		.array(id)
		.min(1, `At least one ${resource} ID is required`)
		.max(25, `A maximum of 25 ${resource} IDs are allowed`)
		.refine((ids) => new Set(ids).size === ids.length, {
			error: `${resource} IDs must be unique`,
			path: [`${resource}Ids`],
		});
