import { z } from 'zod';

import { checkFileType } from '@/utils/checkFileType';
import { MAX_FILE_SIZE } from '@/common/configs/app';

export function getFileValidationSchema(acceptedTypes: string[]) {
	if (typeof window === 'undefined') return z.custom<File[]>();

	return z
		.instanceof(FileList)
		.refine((files) => files?.length !== 0, 'File is required')
		.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is ${MAX_FILE_SIZE}MB`)
		.refine(
			(files) => checkFileType(files[0], acceptedTypes),
			`Only ${acceptedTypes.join(', ')} formats are supported`,
		);
}
