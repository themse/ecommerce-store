import React from 'react';

import { Header } from '../../_components/Header';
import { ProductUpsertForm } from '@/ui/components/organisms/ProductUpsertForm';

export default function ProductAdd() {
	return (
		<div>
			<Header>Add Product</Header>
			<ProductUpsertForm />
		</div>
	);
}
