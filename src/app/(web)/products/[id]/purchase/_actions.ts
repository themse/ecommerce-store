'use server';

import prisma from '@/services/libs/prisma';

export async function userOrderExists(email: string, productId: string) {
	const order = await prisma.order.findFirst({
		select: {
			id: true,
		},
		where: {
			user: {
				email,
			},
			productId,
		},
	});

	return order !== null;
}
