import z from 'zod';

export const createTechPayloadSchema = z.object({
	name: z.string().min(3, 'Name is required'),
	logo_url: z.string().min(3, 'Logo URL is required'),
});
