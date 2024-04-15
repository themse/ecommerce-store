import { unstable_cache as nextCache } from 'next/cache';
import { cache as reactCache } from 'react';

type Callback = (...args: any[]) => Promise<any>;

export function cache<TCallback extends Callback>(
	callback: TCallback,
	keyParts: string[],
	options: {
		revalidate?: number | false;
		tags?: string[];
	} = {},
) {
	return nextCache(reactCache(callback), keyParts, options);
}
