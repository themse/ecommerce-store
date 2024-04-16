import Link from 'next/link';

import { Button } from '@/ui/components/atoms/Button';
import { LinkIcon } from '@/ui/components/atoms/icons';

export default function Expired() {
	return (
		<div className="flex flex-col gap-y-4">
			<h1 className="text-4xl">Download link expired</h1>

			<Button asChild size="lg" className="flex gap-x-2 self-start">
				<Link href="/orders">
					<LinkIcon className="h-4 w-4" />
					Get New Link
				</Link>
			</Button>
		</div>
	);
}
