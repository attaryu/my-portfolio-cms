import z from 'zod';

import { emailOwner, passwordOwner } from './general';

export const ownerCredentialPayloadSchema = z
	.object({
		email: emailOwner.optional(),
		previous_password: passwordOwner.optional(),
		new_password: passwordOwner.optional(),
	})
	.refine(
		({ previous_password, new_password }) =>
			new_password ? !!previous_password : false,
		{
			error: 'Previous password is required when creating a new password.',
			path: ['previous_password'],
		}
	)
	.refine(
		({ new_password, previous_password }) =>
			previous_password ? !!new_password : false,
		{
			error: 'New password is required when filling the previous password.',
			path: ['new_password'],
		}
	)
	.refine((object) => Object.entries(object).length > 0, {
		error: 'At least one field must be provided.',
		path: ['email', 'previous_password', 'new_password'],
	});
