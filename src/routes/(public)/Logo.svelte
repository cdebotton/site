<h1 class="bg-vaporwave">
	<span lang="ja">クリスチャン・デボットン</span>
	<span lang="en">Christian</span>
	<span lang="en">
		<small>de</small>Botton
	</span>
</h1>

<style>
	@keyframes scroll {
		from {
			background-position: 0vw 0vh;
		}

		to {
			background-position: -300vw 0vh;
		}
	}

	h1 {
		display: inline-flex;
		flex-flow: column;
		align-items: center;
		animation: scroll 7.5s ease-in-out infinite alternate;
		background-attachment: fixed;
		background-clip: text;
		background-image: linear-gradient(
			to bottom right,
			var(--brand-blue) 0%,
			var(--brand-purple) 45%,
			var(--brand-purple) 55%,
			var(--brand-blue) 100%
		);
		background-size: 400vw 400vh;
		color: transparent;
		user-select: none;
	}

	span {
		font-size: calc(var(--large) - (var(--progress, 0) * (var(--large) - var(--small))));
	}

	span[lang='ja'] {
		--large: var(--text-xs);
		--small: calc(var(--text-xs) / 1.414);
		color: var(--color-text);
		letter-spacing: var(--tracking-thiccc);
		padding-block-end: var(--space-1);
	}

	span[lang='en'] {
		--large: var(--text-3xl);
		--small: var(--text-xl);
		display: inline-flex;
		align-items: center;
		font-weight: 900;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-squeeze);
		text-transform: uppercase;
	}

	small {
		color: var(--color-text);
		font-size: 0.707em;
		padding-inline: var(--space-2);
		transform: translateY(calc(var(--space-1) / 2));
	}
</style>
