import { useFormStatus } from 'react-dom';

import { Button } from '@/ui/components/atoms/Button';

export const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button disabled={pending} type="submit">
			{pending ? 'Saving...' : 'Save'}
		</Button>
	);
};
