'use server';

import { Product } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';

import prisma from '@/services/libs/prisma';
import { uploadFile } from '@/utils/uploadFile';
import { FormValues } from './schema';
import { ActionResponse } from '@/types/ActionResponse';
import { schema } from './schema';
import { deleteFile } from '@/utils/deleteFile';

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

export async function updateProductAction(
	productId: string,
	_prevState: ActionResponse<Product, FormValues>,
	formData: FormData,
): Promise<ActionResponse<Product, FormValues>> {
	const data = Object.fromEntries(formData);
	const parsed = schema.safeParse(data);

	if (parsed.success) {
		const { name, priceInCents, description } = parsed.data;

		const product = await prisma.product.findUnique({
			where: {
				id: productId,
			},
		});

		if (!product) notFound();

		// TODO Issue send FileList/File[] but receive File
		const file = data.file as File | null;
		const image = data.image as File | null;

		// Upload files
		let filePath = product.filePath;
		if (file !== null && file.size > 0) {
			await deleteFile(product.filePath);
			const response = await uploadFile(file, 'products');
			filePath = response.filePath;
		}

		let imagePath = product.imagePath;
		if (image !== null && image.size > 0) {
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

		redirect('/admin/products');
	}

	return {
		message: 'Invalid data',
		errors: 'Server Error',
		statusCode: 400,
	};
}