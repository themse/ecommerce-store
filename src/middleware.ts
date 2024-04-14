import { withAuth } from '@/services/middlewares/withAuth';
import { NextAuthRequest } from '@/types/NextAuthRequest';

export async function middleware(request: NextAuthRequest) {
	await withAuth(request);
}

export const config = {
	matcher: '/admin/:path*',
};
