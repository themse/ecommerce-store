import { Adapter } from '@/services/Adapter';
import prisma from '@/services/libs/prisma';
import { ProductAdapter } from './ProductAdapter';
import { RawProduct } from './types';
import { Product } from '@prisma/client';
import { cache } from '@/utils/cache';

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

export const getNewestProducts = cache(
	async (): Promise<Product[]> => {
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
	},
	['/', 'newest-products'],
	{},
);

export const getMostPopularProducts = cache(
	async (): Promise<Product[]> => {
		return prisma.product.findMany({
			where: {
				isAvailableForPurchase: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 6,
		});
	},
	['/', 'most-popular-products'],
	{
		revalidate: 60 * 60 * 24, // 1 day
	},
);

export const getAllProducts = cache(async (): Promise<Product[]> => {
	return prisma.product.findMany({
		where: {
			isAvailableForPurchase: true,
		},
		orderBy: {
			name: 'asc',
		},
	});
}, ['/products', 'all-products']);
