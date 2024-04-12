import { ACCEPTED_FILE_TYPES } from '@/common/configs/app';
import { getFileValidationSchema } from '@/utils/getFileValidationSchema';

export const fileSchema = getFileValidationSchema(ACCEPTED_FILE_TYPES);
