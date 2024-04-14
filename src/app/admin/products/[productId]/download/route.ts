import { NextRequest, NextResponse } from 'next/server';
import { notFound } from 'next/navigation';

import prisma from '@/services/libs/prisma';
import { readFile } from '@/utils/readFile';

export async function GET(
	_request: NextRequest,
	{ params: { productId } }: { params: { productId: string } },
) {
	const product = await prisma.product.findUnique({
		where: {
			id: productId,
		},
		select: {
			filePath: true,
			name: true,
		},
	});

	if (!product) notFound();

	const { file, size, extension } = await readFile(product.filePath);

	return new NextResponse(file, {
		headers: {
			'Content-Disposition': `attachment; filename="${product.name}.${extension}"`,
			'Content-Length': size.toString(),
		},
	});
}
