'use server';

import prisma from '@/services/libs/prisma';
import { formatCurrency, formatNumber } from '@/utils/formatters';

export async function getSalesData() {
	const data = await prisma.order.aggregate({
		_sum: {
			pricePaidInCents: true,
		},
		_count: true,
	});

	return {
		amount: formatCurrency((data._sum.pricePaidInCents ?? 0) / 100),
		numberOfSales: formatNumber(data._count),
	};
}

export async function getUserData() {
	const [userCount, orderData] = await Promise.all([
		prisma.user.count(),
		prisma.order.aggregate({
			_sum: {
				pricePaidInCents: true,
			},
		}),
	]);

	return {
		userCount: formatNumber(userCount),
		averageValuePerUser: formatCurrency(
			userCount === 0 ? 0 : (orderData._sum.pricePaidInCents ?? 0) / userCount / 100,
		),
	};
}

export async function getProductData() {
	const [activeCount, inactiveCount] = (
		await Promise.all([
			prisma.product.count({
				where: {
					isAvailableForPurchase: true,
				},
			}),
			prisma.product.count({
				where: {
					isAvailableForPurchase: false,
				},
			}),
		])
	).map((count) => formatNumber(count));

	return { activeCount, inactiveCount };
}
