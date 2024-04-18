'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/ui/components/atoms/Button';
import { Trash2Icon } from '@/ui/components/atoms/icons';
import { cn } from '@/utils/cn';
import { deleteUser } from '../actions';

type Props = {
	userId: string;
	className?: string;
};

export const DeleteItem = ({ userId, className }: Props) => {
	const router = useRouter();

	return (
		<Button
			className={cn('h-auto w-full p-0 hover:no-underline', className)}
			variant="link"
			type="button"
			onClick={async () => {
				await deleteUser(userId);
				router.refresh();
			}}
		>
			<Trash2Icon className="h-5 w-5" />
			Delete
		</Button>
	);
};
