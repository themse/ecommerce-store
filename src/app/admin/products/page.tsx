import 'server-only';
import Link from 'next/link';

import { Button } from '@/ui/components/atoms/Button';
import { ProductsTable } from '@/ui/components/organisms/ProductsTable';
import { getProductList } from '@/services/api/products/products';
import { Header } from '../_components/Header';

export default async function Products() {
	const products = await getProductList();

	return (
		<section className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between gap-x-4">
				<Header>Products</Header>
				<Button asChild>
					<Link href="/admin/products/new"> Add product</Link>
				</Button>
			</div>
			{products.length > 0 ? <ProductsTable products={products} /> : <p>No products found</p>}
		</section>
	);
}
