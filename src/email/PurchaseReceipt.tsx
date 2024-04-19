import {
	Body,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

import { OrderInformation } from './_components/OrderInformation';

type Props = {
	product: {
		name: string;
		description: string;
		imagePath: string;
	};
	order: {
		id: string;
		pricePaidInCents: number;
		createdAt: Date;
	};
	downloadVerificationId: string;
};

PurchaseReceipt.PreviewProps = {
	product: {
		name: 'Product name',
		description: 'Product description',
		imagePath: 'products/macbook.jpg',
	},
	order: {
		id: crypto.randomUUID(),
		pricePaidInCents: 100000,
		createdAt: new Date(),
	},
	downloadVerificationId: crypto.randomUUID(),
} satisfies Props;

export default function PurchaseReceipt({ product, order, downloadVerificationId }: Props) {
	return (
		<Html>
			<Head />
			<Preview>Download {product.name} and view receipt</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white px-2 font-inter">
					<Container className="max-w-xl">
						<Text className="text-2xl font-bold">Purchase Receipt</Text>
						<OrderInformation
							product={product}
							order={order}
							downloadVerificationId={downloadVerificationId}
						/>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
