import { Fragment } from 'react';
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Tailwind,
} from '@react-email/components';

import { OrderInformation } from './_components/OrderInformation';

type Props = {
	orders: {
		downloadVerificationId: string;
		id: string;
		pricePaidInCents: number;
		createdAt: Date;
		product: {
			id: string;
			name: string;
			imagePath: string;
			description: string;
		};
	}[];
};

OrderHistory.PreviewProps = {
	orders: [
		{
			id: crypto.randomUUID(),
			pricePaidInCents: 10000,
			downloadVerificationId: crypto.randomUUID(),
			createdAt: new Date(),
			product: {
				id: crypto.randomUUID(),
				name: 'Product name',
				description: 'Some description',
				imagePath: 'products/macbook.jpg',
			},
		},
	],
} satisfies Props;

export default function OrderHistory({ orders }: Props) {
	return (
		<Html>
			<Preview>Order History & Downloads</Preview>
			<Tailwind>
				<Head />
				<Body className="bg-white font-sans">
					<Container className="max-w-xl">
						<Heading>Order History</Heading>
						{orders.map((order, index) => (
							<Fragment key={order.id}>
								<OrderInformation
									order={order}
									product={order.product}
									downloadVerificationId={order.downloadVerificationId}
								/>
								{index < orders.length - 1 && <Hr />}
							</Fragment>
						))}
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
