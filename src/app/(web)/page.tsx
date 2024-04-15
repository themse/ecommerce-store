import 'server-only';

import { getMostPopularProducts, getNewestProducts } from '@/services/api/products/products';
import { ProductGridSection } from '@/ui/components/organisms/ProductGridSection';

export default function Home() {
	return (
		<main className="flex flex-col gap-y-12">
			<ProductGridSection title="Most Popular" getProducts={getMostPopularProducts} />
			<ProductGridSection title="Newest" getProducts={getNewestProducts} />
		</main>
	);
}
