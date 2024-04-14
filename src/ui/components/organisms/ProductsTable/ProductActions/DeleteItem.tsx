'use client';

import { useTransition } from 'react';

import { Button } from '@/ui/components/atoms/Button';
import { Trash2Icon } from '@/ui/components/atoms/icons';
import { cn } from '@/utils/cn';
import { deleteProduct } from '../_actions';

type Props = {
	productId: string;
	isDisabled: boolean;
	className?: string;
};

export const DeleteItem = ({ productId, isDisabled, className }: Props) => {
	const [isPending, startTransition] = useTransition();

	return (
		<Button
			className={cn('h-auto w-full p-0 hover:no-underline', className)}
			disabled={isDisabled || isPending}
			variant="link"
			type="button"
			onClick={() => {
				startTransition(async () => {
					await deleteProduct(productId);
				});
			}}
		>
			<Trash2Icon className="h-5 w-5" />
			Delete
		</Button>
	);
};
