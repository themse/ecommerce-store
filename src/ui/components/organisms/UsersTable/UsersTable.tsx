import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/components/molecules/Table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/ui/components/molecules/DropdownMenu';
import { Button } from '@/ui/components/atoms/Button';
import { MoreVerticalIcon } from '@/ui/components/atoms/icons';
import { UserTableItem } from '@/services/api/users/types';
import { DeleteItem } from './UserActions/DeleteItem';

type Props = {
	users: UserTableItem[];
};

export const UsersTable = ({ users }: Props) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Email</TableHead>
					<TableHead>Orders</TableHead>
					<TableHead>Value</TableHead>
					<TableHead className="w-0">
						<span className="sr-only">Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{users.map((user) => (
					<TableRow key={user.id}>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.orders}</TableCell>
						<TableCell>{user.sumPriceOfOrders}</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="link" type="button" className="p-0">
										<MoreVerticalIcon />
										<span className="sr-only">Actions</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="flex w-40 flex-col gap-y-1">
									<DropdownMenuItem>
										<DeleteItem
											className="flex cursor-pointer items-center justify-start gap-x-2"
											userId={user.id}
										/>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
