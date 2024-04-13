import { Product } from '@prisma/client';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/ui/components/molecules/Table';
import { formatCurrency, formatNumber } from '@/utils/formatters';

// TODO use Adapter
type ProductItem = Pick<Product, 'id' | 'name' | 'priceInCents' | 'isAvailableForPurchase'> & {
	_count: {
		order: number;
	};
};

type Props = {
	products: ProductItem[];
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
						<TableCell>{formatCurrency(product.priceInCents)}</TableCell>
						<TableCell>{formatNumber(product._count.order)}</TableCell>
						<TableCell className="text-right">N/A</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
