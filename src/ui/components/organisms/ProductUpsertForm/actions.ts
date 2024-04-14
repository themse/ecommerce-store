'use server';

import { Product } from '@prisma/client';
import { redirect } from 'next/navigation';

import prisma from '@/services/libs/prisma';
import { uploadFile } from '@/utils/uploadFile';
import { FormValues } from './schema';
import { ActionResponse } from '@/types/ActionResponse';
import { schema } from './schema';

export async function addProductAction(
	_prevState: ActionResponse<Product, FormValues>,
	formData: FormData,
): Promise<ActionResponse<Product, FormValues>> {
	const data = Object.fromEntries(formData);
	const parsed = schema.safeParse(data);

	if (parsed.success) {
		const { name, priceInCents, description } = parsed.data;

		// TODO Issue send FileList/File[] but receive File
		const { file, image } = data;

		// Upload files
		const { filePath } = await uploadFile(file as File, 'products');
		const { filePath: imagePath } = await uploadFile(image as File, 'products');

		await prisma.product.create({
			data: {
				name,
				priceInCents: Number(priceInCents),
				description,
				filePath,
				imagePath,
				isAvailableForPurchase: false,
			},
		});

		redirect('/admin/products');
	}

	return {
		message: 'Invalid data',
		errors: 'Server Error',
		statusCode: 400,
	};
}
