'use server';

import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

import prisma from '@/services/libs/prisma';

export async function deleteOrder(orderId: string) {
	const order = await prisma.order.delete({
		where: {
			id: orderId,
		},
	});

	if (!order) {
		return notFound();
	}

	revalidatePath('/');
	revalidatePath('/orders');
}
