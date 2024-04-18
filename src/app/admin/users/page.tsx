import 'server-only';

import { getUsersTableData } from '@/services/api/users/users';
import { UsersTable } from '@/ui/components/organisms/UsersTable';
import { Header } from '../_components/Header';

export default async function Users() {
	const users = await getUsersTableData();

	return (
		<section className="flex flex-col gap-y-2">
			<div className="flex items-center justify-between gap-x-4">
				<Header>Customers</Header>
			</div>
			{users.length > 0 ? <UsersTable users={users} /> : <p>No user found</p>}
		</section>
	);
}
