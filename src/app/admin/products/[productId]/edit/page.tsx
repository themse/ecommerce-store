import 'server-only';

import { ProductUpsertForm } from '@/ui/components/organisms/ProductUpsertForm';
import { PageProps } from '@/types/app';
import prisma from '@/services/libs/prisma';
import { Header } from '../../../_components/Header';

export default async function ProductEdit({ params }: PageProps<{ productId: string }>) {
	const { productId } = params;

	const product = await prisma.product.findUnique({
		where: {
			id: productId,
		},
	});

	return (
		<div>
			<Header>Edit Product: {product?.name ?? productId}</Header>
			<ProductUpsertForm product={product} />
		</div>
	);
}
