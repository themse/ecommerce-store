import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
	return (
		<header>
			<h1 className="mb-4 text-4xl font-medium">{children}</h1>
		</header>
	);
};
