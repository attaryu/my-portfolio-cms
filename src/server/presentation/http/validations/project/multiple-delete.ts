import z from 'zod';

import { createMultipleIdsSchema } from '../id';

const projectIds = createMultipleIdsSchema('project');

export const multipleDeleteProjectPayload = z.object({ projectIds });
