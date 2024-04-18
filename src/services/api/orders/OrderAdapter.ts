import { formatCurrency } from '@/utils/formatters';
import { OrderTableItem, RawOrder } from './types';

export class OrderAdapter {
	constructor(private readonly value: RawOrder) {}

	private get productName() {
		const productName = this.value?.product?.name;

		if (!productName) {
			throw new Error('Please select <product.name>');
		}

		return productName;
	}

	private get userEmail() {
		const userEmail = this.value?.user?.email;

		if (!userEmail) {
			throw new Error('Please select <product.name>');
		}

		return userEmail;
	}

	private get pricePaid() {
		return formatCurrency(this.value.pricePaidInCents / 100);
	}

	adaptTableItem(): OrderTableItem {
		return {
			id: this.value.id,
			pricePaid: this.pricePaid,
			productName: this.productName,
			userEmail: this.userEmail,
		};
	}
}
