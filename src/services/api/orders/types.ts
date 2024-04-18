import { Order } from '@prisma/client';

// Adapted data
export type OrderTableItem = {
	id: Order['id'];
	pricePaid: string;
	productName: string;
	userEmail: string;
};

export type RawOrder = Order & {
	user: {
		email: string;
	};
	product: {
		name: string;
	};
};
