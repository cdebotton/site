import type { ReactNode } from 'react';

export default function Logo() {
	return (
		<h1 className="inline-flex flex-col items-center">
			<span className="text-xs tracking-thiccc" lang="ja">
				クリスチャン・デボットン
			</span>
			<Text>Christian</Text>
			<Text>
				<small className="px-1 text-text">de</small>Botton
			</Text>
		</h1>
	);
}

function Text({ children }: { children?: ReactNode }) {
	return (
		<span className="inline-flex animate-bg-crawl-slow items-center bg-clip-text text-4xl font-black uppercase leading-[0.8] tracking-tighter text-[transparent] bg-vaporwave">
			{children}
		</span>
	);
}
