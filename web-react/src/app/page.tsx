import dynamic from 'next/dynamic';

import type { ReactNode } from 'react';

let Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function Home() {
	return (
		<>
			<div className="fixed inset-0 z-[-1]">
				<Scene />
			</div>

			<div className="relative grid min-h-full content-end gap-12">
				<div className="w-full max-w-[32ch]">
					<h2 className="whitespace-pre pb-4 text-5xl font-extrabold leading-none tracking-tighter text-accent first-line:text-3xl">
						Oh,{'\n'}Hello!
					</h2>
					<P>
						My name&apos;s <strong>Christian</strong> and I&apos;m a software
						engineer based in San Francisco.
					</P>
					<P>
						Over my decade-and-a-half long career, I&apos;ve worked on
						<strong>platform</strong>,<strong>product</strong>, and{' '}
						<strong>user experience</strong> engineering teams as both an
						engineering manager and an individual contributor.
					</P>
				</div>
			</div>
		</>
	);
}

function P({ children }: { children?: ReactNode }) {
	return <p className="text-md mb-4 font-light leading-loose">{children}</p>;
}
