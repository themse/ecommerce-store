'use server';

import { notFound } from 'next/navigation';

import prisma from '@/services/libs/prisma';
import { deleteFile } from '@/utils/deleteFile';

export async function toggleProductAvailability(productId: string, isAvailable: boolean) {
	const updatedProduct = await prisma.product.update({
		where: {
			id: productId,
		},
		data: {
			isAvailableForPurchase: isAvailable,
		},
	});

	return updatedProduct;
}

export async function deleteProduct(productId: string) {
	const product = await prisma.product.delete({
		where: {
			id: productId,
		},
	});

	if (!product) {
		return notFound();
	}
	// delete assets
	await deleteFile(product.filePath);
	await deleteFile(product.imagePath);
}
