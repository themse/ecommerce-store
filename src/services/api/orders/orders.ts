import prisma from '@/services/libs/prisma';
import { Adapter } from '@/services/Adapter';
import { OrderAdapter } from './OrderAdapter';
import { RawOrder } from './types';

export async function getOrdersTableData() {
	const rawData = (await prisma.order.findMany({
		select: {
			id: true,
			pricePaidInCents: true,
			product: { select: { name: true } },
			user: { select: { email: true } },
		},
		orderBy: { createdAt: 'desc' },
	})) as RawOrder[];

	const data = rawData.map((rawItem) =>
		Adapter.from(rawItem).to((item) => new OrderAdapter(item).adaptTableItem()),
	);

	return data;
}
