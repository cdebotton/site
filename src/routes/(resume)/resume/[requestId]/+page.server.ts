import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

import json from './resume.json';

import type { PageServerLoad } from './$types';

const resumeSchema = z.array(
	z.object({
		company: z.string(),
		experiences: z.array(
			z.object({
				dates: z.tuple([z.coerce.date(), z.coerce.date().optional()]),
				title: z.string(),
				team: z.string(),
				details: z.array(z.string())
			})
		)
	})
);

export const load: PageServerLoad = ({ params }) => {
	const hasAccess = false;

	// Lookup request id

	if (!hasAccess) {
		console.log(params.requestId);
		throw redirect(301, '/');
	}

	// Log access to resume

	const jobs = resumeSchema.parse(json);

	return {
		jobs
	};
};
