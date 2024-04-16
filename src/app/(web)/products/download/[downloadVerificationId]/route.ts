import { type NextRequest, NextResponse } from 'next/server';

import prisma from '@/services/libs/prisma';
import { readFile } from '@/utils/readFile';

export async function GET(
	request: NextRequest,
	{ params: { downloadVerificationId } }: { params: { downloadVerificationId: string } },
) {
	const data = await prisma.downloadVerification.findUnique({
		where: {
			id: downloadVerificationId,
			expiresAt: {
				gt: new Date(),
			},
		},
		select: {
			product: {
				select: {
					filePath: true,
					name: true,
				},
			},
		},
	});

	if (!data) {
		return NextResponse.redirect(new URL('/products/download/expired', request.url));
	}

	const { file, size, extension } = await readFile(data.product.filePath);

	return new NextResponse(file, {
		headers: {
			'Content-Disposition': `attachment; filename="${data.product.name}.${extension}"`,
			'Content-Length': size.toString(),
		},
	});
}
