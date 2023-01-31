import type { inferAsyncReturnType } from '@trpc/server';

export async function createContext({ locals: _ }: { locals: App.Locals }) {
	return {};
}

export type Context = inferAsyncReturnType<typeof createContext>;
