import fs from 'fs/promises';

export async function deleteFile(filePath: string) {
	await fs.unlink(`public/${filePath}`);
}
