import { Product } from '@prisma/client';

import { formatCurrency, formatNumber } from '@/utils/formatters';
import { ProductTableItem } from './types';

export class ProductAdapter {
	constructor(private readonly value: Product) {}

	private get priceInCents() {
		return formatCurrency(this.value.priceInCents);
	}

	private get orderCount() {
		const _value = this.value as Product & { _count?: { order: number } };

		if (_value?._count && typeof _value?._count?.order != null) {
			return formatNumber(_value._count.order);
		}

		throw new Error('Please aggregate _count by `order`');
	}

	adaptTableItem(): ProductTableItem {
		return {
			id: this.value.id!,
			name: this.value.name!,
			priceInCents: this.priceInCents,
			isAvailableForPurchase: this.value.isAvailableForPurchase!,
			orderCount: this.orderCount,
		};
	}
}