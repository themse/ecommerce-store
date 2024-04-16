'use client';

import Image from 'next/image';
import {
	Elements,
	LinkAuthenticationElement,
	PaymentElement,
	useElements,
	useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, useState } from 'react';

import { Product } from '@prisma/client';
import { env } from '@/utils/env';
import { formatCurrency } from '@/utils/formatters';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/ui/components/molecules/Card';
import { Button } from '@/ui/components/atoms/Button';
import { ShoppingCartIcon } from '@/ui/components/atoms/icons';
import { userOrderExists } from '../_actions';

type Props = {
	product: Product;
	clientSecret: string;
};

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export const CheckoutForm = ({ product, clientSecret }: Props) => {
	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-y-8">
			<div className="flex items-center gap-x-4">
				<div className="relative aspect-video w-1/3 flex-shrink-0">
					<Image src={product.imagePath} alt={product.name} fill className="object-cover" />
				</div>
				<div>
					<p className="text-lg">{formatCurrency(product.priceInCents / 100)}</p>
					<h1 className="text-2xl font-bold">{product.name}</h1>
					<p className="line-clamp-3 text-muted-foreground">{product.description}</p>
				</div>
			</div>
			<Elements
				options={{
					clientSecret,
				}}
				stripe={stripePromise}
			>
				<PaymentForm priceInCents={product.priceInCents} productId={product.id} />
			</Elements>
		</div>
	);
};

function PaymentForm({ priceInCents, productId }: { priceInCents: number; productId: string }) {
	const stripe = useStripe();
	const elements = useElements();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();
	const [email, setEmail] = useState<string | null>(null);

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		if (stripe === null || elements === null || email === null) return;

		setIsLoading(true);

		// * Check for existing order
		const orderExists = await userOrderExists(email, productId);

		if (orderExists) {
			setError(
				'You have already purchased this product. Try to download it from the My Order page',
			);
			setIsLoading(false);

			return;
		}

		stripe
			.confirmPayment({
				elements,
				confirmParams: {
					return_url: `${env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
				},
			})
			.then(({ error }) => {
				if (['card_error', 'validation_error'].includes(error.type)) {
					setError(error.message);
				} else {
					setError('An unknown error occurred');
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<form onSubmit={handleSubmit}>
			<Card className="flex flex-col overflow-hidden">
				<CardHeader>
					<CardTitle>Checkout</CardTitle>
					{error && <CardDescription className="text-destructive">{error}</CardDescription>}
				</CardHeader>
				<CardContent className="flex-grow">
					<PaymentElement />
					<div className="mt-4">
						<LinkAuthenticationElement onChange={(event) => setEmail(event.value.email)} />
					</div>
				</CardContent>
				<CardFooter>
					<Button
						size="lg"
						className="flex w-full gap-x-2"
						disabled={stripe === null || elements === null || isLoading}
					>
						<span>
							{isLoading ? 'Purchasing...' : `Purchase - ${formatCurrency(priceInCents / 100)}`}
						</span>
						<ShoppingCartIcon className="size-4" />
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
