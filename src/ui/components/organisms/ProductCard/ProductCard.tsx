import Link from 'next/link';
import Image from 'next/image';

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
import { formatCurrency } from '@/utils/formatters';

type Props = {
	productId: string;
	name: string;
	priceInCents: number;
	description: string;
	imagePath: string;
};

export const ProductCard = ({ productId, name, priceInCents, description, imagePath }: Props) => {
	return (
		<Card className="flex flex-col overflow-hidden">
			<div className="relative aspect-video h-auto w-full">
				<Image src={imagePath} alt={name} fill className="object-contain" />
			</div>
			<CardHeader>
				<CardTitle>{name}</CardTitle>
				<CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
			</CardHeader>
			<CardContent className="flex-grow">
				<p className="line-clamp-4">{description}</p>
			</CardContent>
			<CardFooter>
				<Button asChild size="lg" className="flex w-full gap-x-2">
					<Link href={`/products/${productId}/purchase`}>
						<span>Purchase</span>
						<ShoppingCartIcon className="size-4" />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};
