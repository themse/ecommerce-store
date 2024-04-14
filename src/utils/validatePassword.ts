export async function validatePassword(password: string, actualHashed: string) {
	const hashedPassword = await hashPassword(password);

	return hashedPassword === actualHashed;
}

async function hashPassword(password: string) {
	const arrayBuffer = await crypto.subtle.digest('SHA-512', new TextEncoder().encode(password));

	return Buffer.from(arrayBuffer).toString('base64');
}
