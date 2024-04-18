import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	/*
	 * Server side Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		// prisma
		DATABASE_URL: z.string().url(),
		// basic auth
		DEMO_AUTH_USER: z.string().min(1),
		DEMO_AUTH_PASSWORD: z.string().min(1),
		// stripe
		STRIPE_SECRET_KEY: z.string().min(1),
		STRIPE_WEBHOOK_SECRET: z.string().min(1),
		// resend.com
		RESEND_API_KEY: z.string().min(1),
		SENDER_EMAIL: z.string().email(),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {
		// stripe
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string().min(1),
		// Own website url
		NEXT_PUBLIC_SERVER_URL: z.string().url(),
	},
	/*
	 * Due to how Next.js bundles environment variables on Edge and Client,
	 * we need to manually destructure them to make sure all are included in bundle.
	 *
	 * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
	 */
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		DEMO_AUTH_USER: process.env.DEMO_AUTH_USER,
		DEMO_AUTH_PASSWORD: process.env.DEMO_AUTH_PASSWORD,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
		NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		SENDER_EMAIL: process.env.SENDER_EMAIL,
	},
});
