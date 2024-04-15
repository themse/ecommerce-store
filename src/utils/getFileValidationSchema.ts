import { z } from 'zod';

import { checkFileType } from '@/utils/checkFileType';
import { MAX_FILE_SIZE } from '@/common/configs/app';

export function getFileValidationSchema(acceptedTypes: string[]) {
	return z
		.instanceof(File, { message: 'File is required' })
		.refine((file) => file.size > 0, 'File is required')
		.refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is ${MAX_FILE_SIZE}MB`)
		.refine(
			(file) => checkFileType(file, acceptedTypes),
			`Only ${acceptedTypes.join(', ')} formats are supported`,
		);
}
