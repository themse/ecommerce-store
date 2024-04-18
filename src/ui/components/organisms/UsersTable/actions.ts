'use server';

import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

import prisma from '@/services/libs/prisma';

export async function deleteUser(userId: string) {
	const user = await prisma.user.delete({
		where: {
			id: userId,
		},
	});

	if (!user) {
		return notFound();
	}

	revalidatePath('/');
	revalidatePath('/users');
}
