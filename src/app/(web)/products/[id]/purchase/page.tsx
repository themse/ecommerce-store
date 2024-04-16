import 'server-only';
import { notFound } from 'next/navigation';

import { PageProps } from '@/types/app';
import prisma from '@/services/libs/prisma';
import { stripe } from '@/services/libs/stripe';
import { CheckoutForm } from './_components/CheckoutForm';

export default async function ProductPurchase({ params }: PageProps<{ id: string }>) {
	const { id: productId } = params;

	const product = await prisma.product.findUnique({
		where: {
			id: productId,
		},
	});

	if (!product) notFound();

	const paymentIntent = await stripe.paymentIntents.create({
		amount: product.priceInCents,
		currency: 'USD',
		metadata: {
			productId,
		},
	});

	if (!paymentIntent.client_secret) {
		throw new Error('Stripe failed to create payment intent');
	}

	return <CheckoutForm product={product} clientSecret={paymentIntent.client_secret} />;
}
