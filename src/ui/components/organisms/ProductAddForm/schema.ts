import { z } from 'zod';

import { imageSchema } from '@/common/form-schemas/image';
import { fileSchema } from '@/common/form-schemas/file';

export const schema = z.object({
	name: z.string().min(1, 'Required'),
	// priceInCents: z.coerce.number().int().min(1, 'Required'),
	priceInCents: z
		.string()
		.regex(/^\d{1,10}$/, 'Invalid price')
		.min(1, 'Required'),
	description: z.string().min(1, 'Required').max(200),
	file: fileSchema.optional(),
	image: imageSchema.optional(),
});

export type FormValues = z.infer<typeof schema>;
