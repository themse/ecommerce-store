import { Product } from '@prisma/client';

export type ProductTableItem = {
	id: Product['id'];
	name: Product['name'];
	priceInCents: string;
	isAvailableForPurchase: Product['isAvailableForPurchase'];
	orderCount: string;
};
