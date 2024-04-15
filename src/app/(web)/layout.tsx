import 'server-only';
import { PropsWithChildren } from 'react';

import { Nav } from '@/ui/components/molecules/Nav/Nav';
import { NavLink } from '@/ui/components/molecules/Nav/NavLink';

export default function WebLayout({ children }: PropsWithChildren) {
	return (
		<>
			<Nav>
				<NavLink href="/">Home</NavLink>
				<NavLink href="/products">Products</NavLink>
				<NavLink href="/orders">My Orders</NavLink>
			</Nav>
			<div className="container my-6">{children}</div>
		</>
	);
}
