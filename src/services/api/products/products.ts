import 'server-only';

import { Adapter } from '@/services/Adapter';
import prisma from '@/services/libs/prisma';
import { ProductAdapter } from './ProductAdapter';

export const getProductList = async () => {
	const rawData = await prisma.product.findMany({
		select: {
			id: true,
			name: true,
			priceInCents: true,
			isAvailableForPurchase: true,
			_count: {
				select: {
					order: true,
				},
			},
		},
		orderBy: {
			name: 'asc',
		},
	});

	const data = rawData.map((rawItem) =>
		// TODO fix type
		// @ts-ignore
		Adapter.from(rawItem).to((item) => new ProductAdapter(item).adaptTableItem()),
	);

	return data;
};
