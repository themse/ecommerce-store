'use client';

import React, { ComponentProps } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/utils/cn';

type Props = ComponentProps<typeof Link>;

export const NavLink = ({ className, ...props }: Props) => {
	const pathname = usePathname();
	const isActive = pathname === props.href;

	return (
		<Link
			{...props}
			className={cn(
				'p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground',
				isActive && 'bg-background text-foreground',
				className,
			)}
		/>
	);
};
