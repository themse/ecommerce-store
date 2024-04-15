import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/ui/components/molecules/Card';
import { Button } from '@/ui/components/atoms/Button';

export const ProductCardSkeleton = () => {
	return (
		<Card className="flex animate-pulse flex-col overflow-hidden">
			<div className="aspect-video h-auto w-full bg-gray-300" />
			<CardHeader>
				<CardTitle>
					<p className="h-6 w-3/4 rounded-full bg-gray-300" />
				</CardTitle>
				<CardDescription>
					<span className="block h-4 w-1/2 rounded-full bg-gray-300" />
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-grow flex-col gap-y-1">
				<div className="h-4 w-full rounded-full bg-gray-300" />
				<div className="h-4 w-full rounded-full bg-gray-300" />
				<div className="h-4 w-3/4 rounded-full bg-gray-300" />
			</CardContent>
			<CardFooter>
				<Button size="lg" className="w-full" disabled />
			</CardFooter>
		</Card>
	);
};
