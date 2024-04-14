import Link from 'next/link';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/components/molecules/Table';
import { Button } from '@/ui/components/atoms/Button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from '@/ui/components/molecules/DropdownMenu';
import { ProductTableItem } from '@/services/api/products/types';
import {
	CheckCircle2Icon,
	XCircleIcon,
	MoreVerticalIcon,
	DownloadIcon,
	PencilIcon,
} from '@/ui/components/atoms/icons';
import { formatNumber } from '@/utils/formatters';
import { ActiveToggleItem } from './ProductActions/ActiveToggleItem';
import { DeleteItem } from './ProductActions/DeleteItem';

type Props = {
	products: ProductTableItem[];
};

export const ProductsTable = ({ products }: Props) => {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-0">
						<span className="sr-only">Available For purchase</span>
					</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Price</TableHead>
					<TableHead>Order</TableHead>
					<TableHead className="w-0">
						<span className="sr-only">Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products.map((product) => (
					<TableRow key={product.id}>
						<TableCell>
							{product.isAvailableForPurchase ? (
								<>
									<CheckCircle2Icon className="text-green-500" />
									<span className="sr-only">Available</span>
								</>
							) : (
								<>
									<XCircleIcon className="text-destructive" />
									<span className="sr-only">Unavailable</span>
								</>
							)}
						</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{product.priceInCents}</TableCell>
						<TableCell>{formatNumber(product.orderCount)}</TableCell>
						<TableCell>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="link" type="button" className="p-0">
										<MoreVerticalIcon />
										<span className="sr-only">Actions</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end" className="flex w-40 flex-col gap-y-1">
									<DropdownMenuItem asChild className="flex cursor-pointer items-center gap-x-2">
										<a download href={`/admin/products/${product.id}/download`}>
											<DownloadIcon className="h-5 w-5" /> Download
										</a>
									</DropdownMenuItem>
									<DropdownMenuItem asChild className="flex cursor-pointer items-center gap-x-2">
										<Link href={`/admin/products/${product.id}/edit`}>
											<PencilIcon className="h-5 w-5" />
											Edit
										</Link>
									</DropdownMenuItem>
									<DropdownMenuItem>
										<ActiveToggleItem
											className="flex cursor-pointer items-center justify-start gap-x-2"
											productId={product.id}
											isAvailableForPurchase={product.isAvailableForPurchase}
										/>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
										<DeleteItem
											className="flex cursor-pointer items-center justify-start gap-x-2"
											productId={product.id}
											isDisabled={product.orderCount > 0}
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
