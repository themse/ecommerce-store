'use client';

import { useRouter } from 'next/navigation';

import { Trash2Icon } from '@/ui/components/atoms/icons';
import { Button } from '@/ui/components/atoms/Button';
import { cn } from '@/utils/cn';
import { deleteOrder } from '../actions';

type Props = {
	orderId: string;
	className?: string;
};

export const DeleteItem = ({ orderId, className }: Props) => {
	const router = useRouter();

	return (
		<Button
			className={cn('h-auto w-full p-0 hover:no-underline', className)}
			variant="link"
			type="button"
			onClick={async () => {
				await deleteOrder(orderId);
				router.refresh();
			}}
		>
			<Trash2Icon className="h-5 w-5" />
			Delete
		</Button>
	);
};
