import fs from 'fs/promises';
import path from 'path';

export async function readFile(filePath: string) {
	const publicFilePath = `public${filePath}`;

	const { size } = await fs.stat(publicFilePath);
	const file = await fs.readFile(publicFilePath);
	const extension = path.extname(publicFilePath);

	return {
		file,
		size,
		extension,
	};
}
