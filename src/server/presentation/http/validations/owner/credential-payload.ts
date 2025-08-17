import z from 'zod';

import { emailOwner, passwordOwner } from './general';

export const ownerCredentialPayloadSchema = z
	.object({
		email: emailOwner.optional(),
		current_password: passwordOwner.optional(),
		new_password: passwordOwner.optional(),
	})
	.refine(
		({ current_password, new_password }) =>
			new_password ? !!current_password : true,
		{
			error: 'Current password is required when creating a new password.',
			path: ['current_password'],
		}
	)
	.refine(
		({ new_password, current_password }) =>
			current_password ? !!new_password : true,
		{
			error: 'New password is required when filling the current password.',
			path: ['new_password'],
		}
	)
	.refine((object) => Object.entries(object).length > 0, {
		error: 'At least one field must be provided.',
		path: ['email', 'current_password', 'new_password'],
	});
