import 'server-only';

import { Analytics } from '@/ui/components/organisms/Analytics/Analytics';

export default async function Dashboard() {
	return (
		<section>
			<Analytics />
		</section>
	);
}
