import z from 'zod';

import { emailOwner, passwordOwner } from './general';

export const ownerCredentialPayloadSchema = z.object({
	email: emailOwner,
	previous_password: passwordOwner,
	new_password: passwordOwner,
});
