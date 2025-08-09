import z from 'zod';

import { createMultipleIdsSchema } from '../id';

export const multipleDeleteTechPayload = z.object({
	techIds: createMultipleIdsSchema('tech'),
});
