import { FileTextIcon } from '@/ui/components/atoms/icons';

type Props = {
	fileName: string;
};

export const FilePreview = ({ fileName }: Props) => {
	return (
		<div className="my-2 flex items-center gap-x-2 text-muted-foreground">
			<FileTextIcon className="h-5 w-5" />
			<span className="w-full truncate">{fileName}</span>
		</div>
	);
};
