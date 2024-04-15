import 'server-only';
import { Suspense } from 'react';

import { ProductCard, ProductCardSkeleton } from '@/ui/components/organisms/ProductCard';
import { getAllProducts } from '@/services/api/products/products';

export default function Products() {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<Suspense
				fallback={
					<>
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
						<ProductCardSkeleton />
					</>
				}
			>
				<ProductList />
			</Suspense>
		</div>
	);
}

export async function ProductList() {
	const products = await getAllProducts();

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
