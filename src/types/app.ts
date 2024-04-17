import { PropsWithChildren } from 'react';

export type PageProps<TParams = void, TSearchParams = void> = Readonly<{
	params: TParams;
	searchParams: TSearchParams;
}>;

export type LayoutProps<TParams = void, TParallelRoutes = void> = Readonly<
	PropsWithChildren<{
		params: TParams;
	}> &
		TParallelRoutes
>;
