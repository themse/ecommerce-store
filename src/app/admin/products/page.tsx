import 'server-only';
import Link from 'next/link';

import { Button } from '@/ui/components/atoms/Button';
import { ProductsTable } from '@/ui/components/organisms/ProductsTable';
import { Header } from '../_components/Header';

export default function Products() {
	return (
		<section className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between gap-x-4">
				<Header>Products</Header>
				<Button asChild>
					<Link href="/admin/products/new"> Add product</Link>
				</Button>
			</div>
			<ProductsTable />
		</section>
	);
}
