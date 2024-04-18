import prisma from '@/services/libs/prisma';
import { Adapter } from '@/services/Adapter';
import { UserAdapter } from './UserAdapter';
import { RawUser } from './types';

export async function getUsersTableData() {
	const rawData = (await prisma.user.findMany({
		select: {
			id: true,
			email: true,
			order: {
				select: {
					pricePaidInCents: true,
				},
			},
		},
		orderBy: {
			createdAt: 'asc',
		},
	})) as RawUser[];

	const data = rawData.map((rawItem) =>
		Adapter.from(rawItem).to((item) => new UserAdapter(item).adaptTableItem()),
	);

	return data;
}
