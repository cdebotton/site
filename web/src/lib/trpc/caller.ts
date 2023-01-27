import { createContext } from './context';
import { router } from './router';

import type { RequestEvent } from '@sveltejs/kit';

export async function getCaller(event: RequestEvent) {
	return router.createCaller(await createContext(event));
}
