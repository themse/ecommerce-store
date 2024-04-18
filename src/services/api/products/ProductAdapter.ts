import { formatCurrency } from '@/utils/formatters';
import { ProductTableItem, RawProduct } from './types';

export class ProductAdapter {
	constructor(private readonly value: RawProduct) {}

	private get priceInCents() {
		return formatCurrency(this.value.priceInCents / 100);
	}

	private get orderCount() {
		const _value = this.value;

		if (_value?._count?.order != null) {
			return _value._count.order;
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
