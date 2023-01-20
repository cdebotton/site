import { z } from 'zod';

import { t } from '../t';

import prisma from '$lib/prisma';

export const findManyPhotosSchema = z.object({});

export const photos = t.router({
	findMany: t.procedure.input(findManyPhotosSchema).query(async () => {
		const photos = await prisma.album.findMany();
		const count = await prisma.album.count();

		return { photos, count };
	})
});
