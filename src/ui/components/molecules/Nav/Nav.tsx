import { PropsWithChildren } from 'react';

export const Nav = ({ children }: PropsWithChildren) => {
	return (
		<nav className="flex justify-center bg-primary px-4 text-primary-foreground">{children}</nav>
	);
};
