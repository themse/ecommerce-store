import fs from 'fs/promises';

export async function uploadFile(file: File, assetsPath: string) {
	const filePath = `/${assetsPath}/${crypto.randomUUID()}-${file.name}`;

	await fs.mkdir(`public/${assetsPath}`, { recursive: true });
	await fs.writeFile(`public/${filePath}`, Buffer.from(await file.arrayBuffer()));

	return { filePath };
}
