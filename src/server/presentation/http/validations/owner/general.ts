import z from 'zod';

export const emailOwner = z
	.email()
	.min(4, 'Email must be at least 4 characters long')
	.max(150, 'Email must be at most 150 characters long');

export const passwordOwner = z
	.string()
	.min(4, 'Password must be at least 4 characters long')
	.max(100, 'Password must be at most 100 characters long');
