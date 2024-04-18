import { formatCurrency, formatNumber } from '@/utils/formatters';
import { RawUser, UserTableItem } from './types';

export class UserAdapter {
	constructor(private readonly value: RawUser) {}

	private get ordersAmount() {
		this._validateOrderField();

		return formatNumber(this.value.order.length);
	}

	private get sumPriceOfOrders() {
		this._validateOrderField();

		return formatCurrency(
			this.value.order.reduce((sum, order) => order.pricePaidInCents + sum, 0) / 100,
		);
	}

	private _validateOrderField() {
		if (!this.value.order) {
			throw new Error('Please join <order> table');
		}
	}

	adaptTableItem(): UserTableItem {
		return {
			id: this.value.id,
			email: this.value.email,
			orders: this.ordersAmount,
			sumPriceOfOrders: this.sumPriceOfOrders,
		};
	}
}
