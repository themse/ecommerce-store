import 'server-only';

import { DashboardCard } from '@/ui/components/organisms/DashboardCard';
import { getSalesData, getUserData, getProductData } from './_actions';

export default async function Dashboard() {
	const [salesData, userData, productData] = await Promise.all([
		getSalesData(),
		getUserData(),
		getProductData(),
	]);

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			<DashboardCard
				title="Sales"
				subtitle={`${salesData.numberOfSales} Orders`}
				content={<p>{salesData.amount}</p>}
			/>
			<DashboardCard
				title="Customers"
				subtitle={`${userData.averageValuePerUser} Average Value`}
				content={<p>{userData.userCount}</p>}
			/>
			<DashboardCard
				title="Active Products"
				subtitle={`${productData.inactiveCount} Inactive`}
				content={<p>{productData.activeCount}</p>}
			/>
		</div>
	);
}
