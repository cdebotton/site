import { z } from 'zod';

import prisma from '../../prisma';
import { t } from '../t';

export const updateUserSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	firstName: z.optional(z.string()),
	lastName: z.optional(z.string()),
	password: z.optional(z.string()),
	confirm: z.optional(z.string()),
});

export const users = t.router({
	findMany: t.procedure
		.input(
			z.optional(
				z.object({
					limit: z.optional(z.number()),
				}),
			),
		)
		.query(async ({ input }) => {
			const users = await prisma.user.findMany({
				take: input?.limit,
				select: {
					id: true,
					email: true,
					name: true,
					image: true,
					accounts: {
						select: {
							provider: true,
						},
					},
					sessions: {
						select: {
							expires: true,
						},
					},
				},
			});

			const total = await prisma.user.count();

			return { users, total };
		}),
});
