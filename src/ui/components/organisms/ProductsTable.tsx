import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/components/molecules/Table';
import { ProductTableItem } from '@/services/api/products/types';

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
				{products.map((product, index) => (
					<TableRow key={product.id}>
						<TableCell className="font-medium">{index + 1}</TableCell>
						<TableCell>{product.name}</TableCell>
						<TableCell>{product.priceInCents}</TableCell>
						<TableCell>{product.orderCount}</TableCell>
						<TableCell className="text-right">N/A</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
