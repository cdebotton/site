import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext({ locals }: { locals: App.Locals }) {
	const session = await locals.getSession();

	return { user: session?.user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
