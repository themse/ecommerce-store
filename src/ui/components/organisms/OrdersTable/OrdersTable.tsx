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
	DropdownMenuTrigger,
	DropdownMenuItem,
} from '@/ui/components/molecules/DropdownMenu';
import { Button } from '@/ui/components/atoms/Button';
import { MoreVerticalIcon } from '@/ui/components/atoms/icons';
import { OrderTableItem } from '@/services/api/orders/types';
import { DeleteItem } from './OrderActions/DeleteItem';

type Props = {
	orders: OrderTableItem[];
};

export const OrdersTable = ({ orders }: Props) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Product</TableHead>
					<TableHead>Customer</TableHead>
					<TableHead>Price Paid</TableHead>
					<TableHead className="w-0">
						<span className="sr-only">Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{orders.map((order) => (
					<TableRow key={order.id}>
						<TableCell>{order.productName}</TableCell>
						<TableCell>{order.userEmail}</TableCell>
						<TableCell>{order.pricePaid}</TableCell>
						<TableCell className="text-center">
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
											orderId={order.id}
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
