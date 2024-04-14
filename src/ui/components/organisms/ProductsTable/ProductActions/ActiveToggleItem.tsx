'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/ui/components/atoms/Button';
import { CheckCircle2Icon, XCircleIcon } from '@/ui/components/atoms/icons';
import { cn } from '@/utils/cn';
import { toggleProductAvailability } from '../_actions';

type Props = {
	productId: string;
	isAvailableForPurchase: boolean;
	className?: string;
};

export const ActiveToggleItem = ({ productId, isAvailableForPurchase, className }: Props) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<Button
			className={cn('h-auto w-full p-0 hover:no-underline', className)}
			disabled={isPending}
			variant="link"
			type="button"
			onClick={() => {
				startTransition(async () => {
					await toggleProductAvailability(productId, !isAvailableForPurchase);

					router.refresh();
				});
			}}
		>
			{isAvailableForPurchase ? (
				<>
					<XCircleIcon className="h-5 w-5" />
					Deactivate
				</>
			) : (
				<>
					<CheckCircle2Icon className="h-5 w-5" />
					Activate
				</>
			)}
		</Button>
	);
};
