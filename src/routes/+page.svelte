<script>
	import Glass from '$lib/icons/glass.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Mastodon from '$lib/icons/mastodon.svelte';

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
		<h2>Oh, hello!</h2>
		<p>
			My name's <em>Christian</em> and I'm a software engineer based on San Francisco. Over my
			decade&#8209;and&#8209;a&#8209;half long career, I've worked on
			<em>platform</em>,
			<em>product</em>, and <em>user experience</em> engineering teams.
		</p>
	</div>
	<div class="connect">
		<ul>
			<li>
				<a target="_blank" rel="noreferrer" href="https://linkedin.com/in/christiandebotton">
					<Linkedin />
				</a>
			</li>
			<li>
				<a target="_blank" rel="noreferrer" href="https://glass.photo/cdb">
					<Glass />
				</a>
			</li>
			<li>
				<a target="_blank" rel="noreferrer" href="https://mas.to/@cdebotton">
					<Mastodon />
				</a>
			</li>
		</ul>
	</div>
</div>

<style>
	.canvas {
		position: absolute;
		inset: 0;
	}

	.content {
		position: relative;
		display: grid;
		height: 100%;
		align-content: end;
		gap: var(--space-12);
	}

	.intro,
	.connect {
		width: 100%;
		max-width: 32ch;
	}

	h2 {
		color: var(--plum11);
		font-size: var(--text-xl);
		font-weight: 800;
		letter-spacing: var(--tracking-wide);
		line-height: var(--leading-heading);
		padding-block-end: var(--space-3);
		text-decoration: underline;
		text-decoration-color: var(--plum12);
		text-decoration-thickness: 2px;
		text-underline-offset: 5px;
	}

	p {
		font-size: var(--text-sm);
		font-weight: 300;
		line-height: var(--leading-body-tight);
	}

	.connect ul {
		display: flex;
		font-size: var(--text-lg);
		gap: var(--space-4);
	}

	.connect a {
		display: inline-block;
		border-radius: 7px;
		background-color: var(--mauve4);
		padding-block: var(--space-2);
		padding-inline: var(--space-4);
	}

	@media not all and (hover: none) {
		.connect a:hover {
			background-color: var(--mauve5);
		}
	}

	@media screen and (min-width: 480px) {
		.content {
			gap: var(--space-16);
		}

		h2 {
			font-size: var(--text-3xl);
			font-weight: 600;
			padding-block-end: var(--space-4);
		}

		p {
			font-size: var(--text-md);
			font-weight: 200;
			line-height: var(--leading-body);
		}

		.intro,
		.connect {
			max-width: 48ch;
		}
	}
</style>
