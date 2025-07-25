import z from 'zod';

export const multipleDeleteTechPayload = z.object({
	ids: z.array(z.uuid()).nonempty('At least one ID is required'),
});
