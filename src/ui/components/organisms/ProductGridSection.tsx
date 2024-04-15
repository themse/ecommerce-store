import Link from 'next/link';
import { ComponentProps, Suspense } from 'react';

import { Product } from '@prisma/client';
import { Button } from '@/ui/components/atoms/Button';
import { ArrowRightIcon } from '@/ui/components/atoms/icons';
import { ProductCard, ProductCardSkeleton } from '@/ui/components/organisms/ProductCard';

type Props = {
	title: string;
	getProducts: () => Promise<Product[]>;
};

export const ProductGridSection = ({ title, getProducts }: Props) => {
	return (
		<div className="flex flex-col gap-y-4">
			<div className="flex gap-x-4">
				<h2 className="text-3xl font-bold">{title}</h2>
				<Button asChild variant="outline">
					<Link href="/products" className="flex gap-x-2">
						<span>View all</span>
						<ArrowRightIcon className="size-4" />
					</Link>
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Suspense
					fallback={
						<>
							<ProductCardSkeleton />
							<ProductCardSkeleton />
							<ProductCardSkeleton />
						</>
					}
				>
					<ProductList getProducts={getProducts} />
				</Suspense>
			</div>
		</div>
	);
};

async function ProductList({
	getProducts,
}: Pick<ComponentProps<typeof ProductGridSection>, 'getProducts'>) {
	const products = await getProducts();

	if (products.length === 0) {
		return null;
	}

	return products.map((product) => (
		<ProductCard
			key={product.id}
			productId={product.id}
			name={product.name}
			priceInCents={product.priceInCents}
			description={product.description}
			imagePath={product.imagePath}
		/>
	));
}
