<script>
	let sceneLoader = import('$lib/components/scene.svelte');
</script>

<svelte:head>
	<title>Christian de Botton</title>
	<meta
		name="description"
		content="Software engineer, photographer, and videographer based in San Francisco."
	/>
</svelte:head>

<div class="canvas">
	{#await sceneLoader then { default: Scene }}
		<Scene />
	{/await}
</div>

<div class="content">
	<div class="intro">
		<h2>Oh,{'\n'}Hello!</h2>
		<p>
			My name's <em>Christian</em> and I'm a software engineer based in San Francisco. Over my
			decade&#8209;and&#8209;a&#8209;half long career, I've worked on
			<em>platform</em>,
			<em>product</em>, and <em>user experience</em> engineering teams.
		</p>
	</div>
</div>

<style>
	.canvas {
		position: fixed;
		z-index: 0;
		inset: 0;
	}

	.content {
		position: relative;
		display: grid;
		height: 100%;
		align-content: end;
		gap: var(--space-12);
	}

	.intro {
		width: 100%;
		max-width: 32ch;
	}

	h2 {
		color: var(--color-accent);
		font-size: var(--text-2xl);
		font-weight: 800;
		letter-spacing: var(--tracking-normal);
		line-height: var(--leading-none);
		padding-block-end: var(--space-4);
		white-space: pre;
	}

	h2::first-line {
		font-size: var(--text-xl);
	}

	p {
		font-size: var(--text-sm);
		font-weight: 300;
		line-height: var(--leading-body);
	}

	@media screen and (min-width: 480px) {
		.content {
			gap: var(--space-16);
		}

		h2 {
			font-size: var(--text-4xl);
			font-weight: 800;
		}

		h2::first-line {
			font-size: var(--text-2xl);
		}

		p {
			font-size: var(--text-md);
			font-weight: 200;
		}

		.intro {
			max-width: 48ch;
		}
	}
</style>
