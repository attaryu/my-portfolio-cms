import z from 'zod';

export const ownerLoginPayload = z.object({
	email: z.email(),
	password: z.string(),
});
