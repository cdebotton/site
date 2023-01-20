<h1>
	<span lang="ja">クリスチャン・デボットン</span>
	<span>Christian</span>
	<span>
		<small>de</small>
		&nbsp;Botton
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
		user-select: none;
	}

	h1 [lang='ja'] {
		color: var(--color-text);
		font-size: var(--text-xs);
		letter-spacing: var(--tracking-thiccc);
		padding-block-end: var(--space-1);
		padding-inline-start: var(--space-5);
	}

	h1 span:not([lang='ja']) {
		display: inline-flex;
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
		font-size: var(--text-2xl);
		font-weight: 900;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-squeeze);
		text-transform: uppercase;
	}

	h1 small {
		color: var(--color-text);
		font-size: 0.707em;
		padding-inline: var(--space-1);
	}
</style>
