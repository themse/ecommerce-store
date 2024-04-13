import { Product } from '@prisma/client';

// Adapted data
export type ProductTableItem = {
	id: Product['id'];
	name: Product['name'];
	priceInCents: string;
	isAvailableForPurchase: Product['isAvailableForPurchase'];
	orderCount: string;
};

// Raw Data use cases
export type RawProduct = Product &
	Partial<{
		_count: Partial<{
			order: number;
		}>;
	}>;
