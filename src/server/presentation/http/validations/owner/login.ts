import z from 'zod';

import { emailOwner, passwordOwner } from './general';

export const ownerLoginPayload = z.object({
	email: emailOwner,
	password: passwordOwner,
});
