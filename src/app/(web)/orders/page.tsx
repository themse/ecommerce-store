import 'server-only';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/ui/components/molecules/Card';
import { Label } from '@/ui/components/atoms/Label';
import { Input } from '@/ui/components/atoms/Input';
import { SendIcon } from '@/ui/components/atoms/icons';
import { Button } from '@/ui/components/atoms/Button';
import { sendRequestOrderInfo } from './_actions';

export default function MyOrders() {
	return (
		<form action={sendRequestOrderInfo} className="max-2-xl mx-auto">
			<Card>
				<CardHeader>
					<CardTitle>My Orders</CardTitle>
					<CardDescription>
						Enter your email amd we will email your order history and download links
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-y-2">
						<Label htmlFor="email">Email</Label>
						<Input type="email" required name="email" id="email" />
					</div>
				</CardContent>
				<CardFooter>
					<Button type="submit" className="flex gap-x-2">
						<SendIcon className="size-4" /> Send
					</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
