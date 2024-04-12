import { ReactNode } from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/ui/components/molecules/Card';

type Props = {
	title: string;
	subtitle: string;
	content: ReactNode;
};

export const DashboardCard = ({ title, subtitle, content }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{subtitle}</CardDescription>
			</CardHeader>
			<CardContent>{content}</CardContent>
			<CardFooter>
				{/* TODO buttons */}
				<p>Card Footer</p>
			</CardFooter>
		</Card>
	);
};
