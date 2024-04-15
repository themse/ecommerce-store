import Image from 'next/image';

import { cn } from '@/utils/cn';

type Props = {
	file: File | string;
	className?: string;
};

export const ImagePreview = ({ file, className }: Props) => {
	const imgSource = file instanceof File ? URL.createObjectURL(file) : file;

	// ? Do we need it -> URL.revokeObjectURL(imgSource)

	return (
		<div className={cn('w-full rounded-sm border border-gray-100 p-2', className)}>
			<Image
				className="w-full object-cover"
				src={imgSource}
				alt="preview"
				width={300}
				height={300}
			/>
		</div>
	);
};
