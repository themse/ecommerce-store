'use server';

import { redirect } from 'next/navigation';

import prisma from '@/services/libs/prisma';
import { uploadFile } from '@/utils/uploadFile';
import { FormValues } from './schema';

type Payload = Omit<FormValues, 'image' | 'file'> & {
	file: File;
	image: File;
};

export async function addProductAction(formData: FormData) {
	const { file, image, name, priceInCents, description } = Object.fromEntries(formData) as Payload;

	const { filePath } = await uploadFile(file, 'products');
	const { filePath: imagePath } = await uploadFile(image, 'products');

	await prisma.product.create({
		data: {
			name,
			priceInCents: Number(priceInCents),
			description,
			filePath,
			imagePath,
		},
	});

	redirect('/admin/products');
}
