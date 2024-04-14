import { type NextRequest } from 'next/server';

export type NextAuthRequest = NextRequest & {
	auth: {
		session: {
			name: string;
		};
	};
};
