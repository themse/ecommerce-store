import { Column, Row, Section, Text, Img, Button } from '@react-email/components';

import { dateFormatter } from '@/utils/dateFormatter';
import { formatCurrency } from '@/utils/formatters';
import { env } from '@/utils/env';

type Props = {
	order: {
		id: string;
		pricePaidInCents: number;
		createdAt: Date;
	};
	product: {
		name: string;
		imagePath: string;
		description: string;
	};
	downloadVerificationId: string;
};

export const OrderInformation = ({ order, product, downloadVerificationId }: Props) => {
	return (
		<>
			<Section>
				<Row>
					<Column>
						<Text className="mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500">Order ID</Text>
						<Text className="mr-4 mt-0">{order.id}</Text>
					</Column>
					<Column>
						<Text className="mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500">
							Purchase On
						</Text>
						<Text className="mr-4 mt-0">{dateFormatter.format(order.createdAt)}</Text>
					</Column>
					<Column>
						<Text className="mb-0 mr-4 whitespace-nowrap text-nowrap text-gray-500">
							Price Paid
						</Text>
						<Text className="mr-4 mt-0">{formatCurrency(order.pricePaidInCents / 100)}</Text>
					</Column>
				</Row>
			</Section>
			<Section className="my-4 rounded-md border border-solid border-gray-500 p-4">
				<Img
					alt={product.name}
					width="100%"
					src={`${env.NEXT_PUBLIC_SERVER_URL}/${product.imagePath}`}
				/>
				<Row className="mt-8">
					<Column className="align-bottom">
						<Text className="m-0 mr-4 text-lg font-bold">{product.name}</Text>
					</Column>
					<Column align="right">
						<Button
							href={`${env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
							className="rounded-md bg-black px-4 py-2 text-lg text-white"
						>
							Download
						</Button>
					</Column>
				</Row>
				<Row>
					<Column>
						<Text className="mb-0 text-gray-500">{product.description}</Text>
					</Column>
				</Row>
			</Section>
		</>
	);
};
