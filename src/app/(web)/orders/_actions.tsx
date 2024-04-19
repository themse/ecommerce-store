'use server';

import { z } from 'zod';

import prisma from '@/services/libs/prisma';
import { resend } from '@/services/libs/resend';
import { env } from '@/utils/env';
import OrderHistory from '@/email/OrderHistory';

const schema = z.object({
	email: z.string().email(),
});

export async function sendRequestOrderInfo(formData: FormData) {
	const data = Object.fromEntries(formData);
	const parsed = schema.safeParse(data);

	if (!parsed.success) {
		return {
			error: 'Invalid email address',
		};
	}

	const user = await prisma.user.findUnique({
		where: {
			email: parsed.data.email,
		},
		select: {
			email: true,
			order: {
				select: {
					pricePaidInCents: true,
					id: true,
					product: {
						select: {
							id: true,
							name: true,
							imagePath: true,
							description: true,
						},
					},
					createdAt: true,
				},
			},
		},
	});

	if (!user) {
		return {
			message: 'Check your email to view your order history and download your products',
		};
	}

	const orders = await Promise.all(
		user.order.map(async (order) => {
			return {
				...order,
				downloadVerificationId: (
					await prisma.downloadVerification.create({
						data: {
							expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
							productId: order.product.id,
						},
					})
				).id,
			};
		}),
	);

	const emailData = await resend.emails.send({
		from: `Support <${env.SENDER_EMAIL}>`,
		to: user.email,
		subject: 'Order History',
		react: <OrderHistory orders={orders} />,
	});

	if (emailData.error) {
		return { error: 'There was an error sending your email. Please try again.' };
	}

	return {
		message: 'Check your email to view your order history and download your products.',
	};
}
