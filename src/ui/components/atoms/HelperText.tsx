import { ComponentPropsWithoutRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/cn';

const helperTextVariants = cva('text-sm', {
	variants: {
		variant: {
			default: 'text-gray-500',
			error: 'text-destructive',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export interface HelperTextProps
	extends ComponentPropsWithoutRef<'p'>,
		VariantProps<typeof helperTextVariants> {}

export const HelperText = ({ children, className, variant, ...props }: HelperTextProps) => {
	return (
		<p className={cn(helperTextVariants({ variant }), className)} {...props}>
			{children}
		</p>
	);
};
