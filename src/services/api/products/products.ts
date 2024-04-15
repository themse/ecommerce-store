import { Adapter } from '@/services/Adapter';
import prisma from '@/services/libs/prisma';
import { ProductAdapter } from './ProductAdapter';
import { RawProduct } from './types';
import { Product } from '@prisma/client';
import { wait } from '@/utils/wait';

export const getProductTableData = async () => {
	const rawData = (await prisma.product.findMany({
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
	})) as RawProduct[];

	const data = rawData.map((rawItem) =>
		Adapter.from(rawItem).to((item) => new ProductAdapter(item).adaptTableItem()),
	);

	return data;
};

export async function getNewestProducts(): Promise<Product[]> {
	await wait(1000); // for demo purpose

	return prisma.product.findMany({
		where: {
			isAvailableForPurchase: true,
		},
		orderBy: {
			order: {
				_count: 'desc',
			},
		},
		take: 6,
	});
}

export async function getMostPopularProducts(): Promise<Product[]> {
	await wait(2000); // for demo purpose

	return prisma.product.findMany({
		where: {
			isAvailableForPurchase: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
		take: 6,
	});
}

export async function getAllProducts(): Promise<Product[]> {
	return prisma.product.findMany({
		where: {
			isAvailableForPurchase: true,
		},
		orderBy: {
			name: 'asc',
		},
	});
}
