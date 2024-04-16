import 'server-only';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { formatCurrency } from '@/utils/formatters';
import { PageProps } from '@/types/app';
import { stripe } from '@/services/libs/stripe';
import prisma from '@/services/libs/prisma';
import { Alert, AlertDescription, AlertTitle } from '@/ui/components/molecules/Alert';
import {
	CircleCheckBigIcon,
	AlertCircleIcon,
	Undo2Icon,
	DownloadIcon,
} from '@/ui/components/atoms/icons';
import { Button } from '@/ui/components/atoms/Button';
import { createDownloadVerification } from './_actions';

export default async function PurchaseSuccess({ searchParams }: PageProps) {
	const paymentIntentId = searchParams?.payment_intent as string | undefined;

	if (!paymentIntentId) return notFound();

	const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

	if (!paymentIntent.metadata.productId) return notFound();

	const product = await prisma.product.findUnique({
		where: {
			id: paymentIntent.metadata.productId,
		},
	});

	if (!product) return notFound();

	const isSuccess = paymentIntent.status === 'succeeded';

	const downloadVerificationId = await createDownloadVerification(product.id);

	return (
		<div className="mx-auto flex w-full max-w-5xl flex-col gap-y-8">
			{isSuccess ? (
				<Alert variant="success">
					<CircleCheckBigIcon className="h-4 w-4" />
					<AlertTitle>Success!</AlertTitle>
					<AlertDescription>Your payment was successful. Thank you!</AlertDescription>
				</Alert>
			) : (
				<Alert variant="destructive">
					<AlertCircleIcon className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						Something went wrong with the payment. Please try again.
					</AlertDescription>
				</Alert>
			)}
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
			<Button asChild type="button" className="flex gap-x-2">
				{isSuccess ? (
					<a download href={`/products/download/${downloadVerificationId}`}>
						<DownloadIcon className="h-4 w-4" /> Download
					</a>
				) : (
					<Link href={`/products/${product.id}/purchase`}>
						<Undo2Icon className="h-4 w-4" /> Try again
					</Link>
				)}
			</Button>
		</div>
	);
}
