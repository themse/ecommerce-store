import { NextResponse, type NextRequest } from 'next/server';

import { stripe } from '@/services/libs/stripe';
import { env } from '@/utils/env';
import prisma from '@/services/libs/prisma';
import { resend } from '@/services/libs/resend';
import PurchaseReceipt from '@/email/PurchaseReceipt';

export async function POST(request: NextRequest) {
	const data = await request.text();
	const stripeSignature = request.headers.get('stripe-signature') as string;

	const event = await stripe.webhooks.constructEventAsync(
		data,
		stripeSignature,
		env.STRIPE_WEBHOOK_SECRET,
	);

	if (event.type === 'charge.succeeded') {
		const charge = event.data.object;
		const productId = charge.metadata.productId;
		const email = charge.billing_details.email;
		const pricePaidInCents = charge.amount;

		const product = await prisma.product.findUnique({
			where: {
				id: productId,
			},
		});

		if (!product || !email) {
			return new NextResponse('Bad Request', {
				status: 400,
			});
		}

		const userFields = {
			email,
			order: {
				create: {
					productId,
					pricePaidInCents,
				},
			},
		};

		const {
			order: [orderItem],
		} = await prisma.user.upsert({
			where: {
				email,
			},
			create: userFields,
			update: userFields,
			select: {
				order: {
					orderBy: {
						createdAt: 'desc',
					},
					take: 1,
				},
			},
		});

		const downloadVerification = await prisma.downloadVerification.create({
			data: {
				productId,
				expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
			},
		});

		await resend.emails.send({
			from: `Support <${env.SENDER_EMAIL}>`,
			to: email,
			subject: 'Order Confirmation',
			react: (
				<PurchaseReceipt
					order={orderItem}
					product={product}
					downloadVerificationId={downloadVerification.id}
				/>
			),
		});

		return new NextResponse();
	}
}
