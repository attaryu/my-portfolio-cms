import z from 'zod';

export const techPayloadSchema = z.object({
	name: z.string().min(3, 'Name is required').max(32, 'Name has max 32 charachters'),
	logo_url: z.url().min(3, 'Logo URL is required'),
});
