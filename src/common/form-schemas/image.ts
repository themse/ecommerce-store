import { ACCEPTED_IMAGE_TYPES } from '@/common/configs/app';
import { getFileValidationSchema } from '@/utils/getFileValidationSchema';

export const imageSchema = getFileValidationSchema(ACCEPTED_IMAGE_TYPES);
