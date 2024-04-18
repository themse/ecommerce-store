import 'server-only';

import { OrdersTable } from '@/ui/components/organisms/OrdersTable';
import { getOrdersTableData } from '@/services/api/orders/orders';
import { Header } from '../_components/Header';

export default async function Orders() {
	const orders = await getOrdersTableData();

	return (
		<section className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between gap-x-4">
				<Header>Sales</Header>
			</div>
			{orders.length > 0 ? <OrdersTable orders={orders} /> : <p>No order found</p>}
		</section>
	);
}
