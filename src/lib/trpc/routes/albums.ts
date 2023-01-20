import { z } from 'zod';

import { t } from '../t';

import prisma from '$lib/prisma';

export const findManyAlbumsSchema = z.object({});

export const albums = t.router({
	findMany: t.procedure.input(findManyAlbumsSchema).query(async ({ input }) => {
		const albums = await prisma.album.findMany();
		const total = await prisma.album.count();

		return { albums, total };
	}),
});
