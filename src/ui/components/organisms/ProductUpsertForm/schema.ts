import { z } from 'zod';

import { imageSchema } from '@/common/form-schemas/image';
import { fileSchema } from '@/common/form-schemas/file';

export const addSchema = z.object({
	name: z.string().min(1, 'Required'),
	// priceInCents: z.coerce.number().int().min(1, 'Required'),
	priceInCents: z
		.string()
		.regex(/^\d{1,10}$/, 'Invalid price')
		.min(1, 'Required'),
	description: z.string().min(1, 'Required').max(2000),
	file: fileSchema,
	image: imageSchema,
});

export const updateSchema = addSchema.extend({
	file: addSchema.shape.file.optional(),
	image: addSchema.shape.image.optional(),
});

export type AddFormValues = z.infer<typeof addSchema>;
export type UpdateFormValues = z.infer<typeof updateSchema>;
