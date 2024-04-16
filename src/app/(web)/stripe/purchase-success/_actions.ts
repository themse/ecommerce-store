'use server';

import prisma from '@/services/libs/prisma';

export async function createDownloadVerification(productId: string) {
	const verification = await prisma.downloadVerification.create({
		data: {
			productId,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
		},
	});

	return verification.id;
}
