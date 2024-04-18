import 'server-only';
import { PropsWithChildren } from 'react';

import { Nav } from '@/ui/components/molecules/Nav/Nav';
import { NavLink } from '@/ui/components/molecules/Nav/NavLink';

export const dynamic = 'force-dynamic';

export default function AdminLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Nav>
				<NavLink href="/admin">Dashboard</NavLink>
				<NavLink href="/admin/products">Products</NavLink>
				<NavLink href="/admin/users">Customers</NavLink>
				<NavLink href="/admin/orders">Sales</NavLink>
			</Nav>
			<div className="container my-6">{children}</div>
		</>
	);
}
