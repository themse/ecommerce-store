'use server';

import { Prisma, Product } from '@prisma/client';

import prisma from '@/services/libs/prisma';
import { uploadFile } from '@/utils/uploadFile';
import { FormValues } from './schema';
import { ActionResponse } from '@/types/ActionResponse';
import { getErrorMessage } from '@/utils/getErrorMessage';

type Payload = Omit<FormValues, 'image' | 'file'> & {
	file: File;
	image: File;
};

export async function addProductAction(
	_prevState: ActionResponse<Product, FormValues>,
	formData: FormData,
): Promise<ActionResponse<Product, FormValues>> {
	try {
		const { file, image, name, priceInCents, description } = Object.fromEntries(
			formData,
		) as Payload;

		const { filePath } = await uploadFile(file, 'products');
		const { filePath: imagePath } = await uploadFile(image, 'products');

		const created = await prisma.product.create({
			data: {
				name,
				priceInCents: Number(priceInCents),
				description,
				filePath,
				imagePath,
			},
		});

		return {
			message: 'New product is created',
			data: created,
		};
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				message: 'Database Error',
				errors: error.message,
				statusCode: 400,
			};
		}

		return {
			message: getErrorMessage(error),
			errors: 'Server Error',
			statusCode: 400,
		};
	}
}
