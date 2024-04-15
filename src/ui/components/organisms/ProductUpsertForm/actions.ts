'use server';

import { Product } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';

import prisma from '@/services/libs/prisma';
import { uploadFile } from '@/utils/uploadFile';
import { ActionResponse } from '@/types/ActionResponse';
import { deleteFile } from '@/utils/deleteFile';
import { AddFormValues, UpdateFormValues, addSchema, updateSchema } from './schema';

export async function addProductAction(
	_prevState: ActionResponse<Product, AddFormValues>,
	formData: FormData,
): Promise<ActionResponse<Product, AddFormValues>> {
	const data = Object.fromEntries(formData);
	const parsed = addSchema.safeParse(data);

	if (parsed.success) {
		const { name, priceInCents, description, file, image } = parsed.data;

		// Upload files
		const { filePath } = await uploadFile(file, 'products');
		const { filePath: imagePath } = await uploadFile(image, 'products');

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

		revalidatePath('/');
		revalidatePath('/products');

		redirect('/admin/products');
	}

	return {
		message: 'Invalid data',
		errors: 'Server Error',
		statusCode: 400,
	};
}

export async function updateProductAction(
	productId: string,
	_prevState: ActionResponse<Product, UpdateFormValues>,
	formData: FormData,
): Promise<ActionResponse<Product, UpdateFormValues>> {
	const data = Object.fromEntries(formData);
	const parsed = updateSchema.safeParse(data);

	if (parsed.success) {
		const { name, priceInCents, description, file, image } = parsed.data;

		const product = await prisma.product.findUnique({
			where: {
				id: productId,
			},
		});

		if (!product) notFound();

		// Upload files
		let filePath = product.filePath;
		if (file != null && file.size > 0) {
			await deleteFile(product.filePath);
			const response = await uploadFile(file, 'products');
			filePath = response.filePath;
		}

		let imagePath = product.imagePath;
		if (image != null && image.size > 0) {
			await deleteFile(product.imagePath);
			const response = await uploadFile(image, 'products');
			imagePath = response.filePath;
		}

		await prisma.product.update({
			where: {
				id: productId,
			},
			data: {
				name,
				priceInCents: Number(priceInCents),
				description,
				filePath,
				imagePath,
				isAvailableForPurchase: false,
			},
		});

		revalidatePath('/');
		revalidatePath('/products');

		redirect('/admin/products');
	}

	return {
		message: 'Invalid data',
		errors: 'Server Error',
		statusCode: 400,
	};
}
