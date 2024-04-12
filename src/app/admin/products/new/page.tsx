import React from 'react';

import { Header } from '../../_components/Header';
import { ProductAddForm } from '@/ui/components/organisms/ProductAddForm/ProductAddForm';

export default function ProductAdd() {
	return (
		<div>
			<Header>Add Product</Header>
			<ProductAddForm />
		</div>
	);
}
