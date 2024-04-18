import { User } from '@prisma/client';

// Adapted data
export type UserTableItem = {
	id: User['id'];
	email: User['email'];
	orders: string;
	sumPriceOfOrders: string;
};

export type RawUser = User & {
	order: {
		pricePaidInCents: number;
	}[];
};
