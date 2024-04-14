import { env } from '@/utils/env';
import { NextResponse } from 'next/server';

import { NextAuthRequest } from '@/types/NextAuthRequest';
import { validatePassword } from '@/utils/validatePassword';

export async function withAuth(request: NextAuthRequest) {
	const authHeader = request.headers.get('authorization') || request.headers.get('Authorization');

	if (authHeader === null) {
		return new NextResponse('Unauthorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic',
			},
		});
	}

	// Bearer hash
	const encodedCredentials = authHeader.split(' ')[1];
	// username:password
	const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();

	const [username, password] = decodedCredentials.split(':');

	const isPasswordValid = await validatePassword(password, env.DEMO_AUTH_PASSWORD);

	if (env.DEMO_AUTH_USER === username && isPasswordValid) {
		request.auth = {
			session: { name: username },
		};
	} else {
		return new NextResponse('Unauthorized', {
			status: 401,
			headers: {
				'WWW-Authenticate': 'Basic',
			},
		});
	}
}
