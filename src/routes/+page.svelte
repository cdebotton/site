<script lang="ts">
	import Footer from './Footer.svelte';

	import type { PageServerData } from './$types';

	import Loader from '$lib/components/Loader.svelte';

	export let data: PageServerData;

	let sceneLoader = import('./SolarSystem/Scene.svelte');

	console.log(data);
</script>

<svelte:head>
	<title>Christian de Botton</title>
	<meta
		name="description"
		content="Software engineer, photographer, and videographer based in San Francisco."
	/>
</svelte:head>

<div class="canvas">
	{#await sceneLoader}
		<Loader />
	{:then { default: Scene }}
		<Scene />
	{/await}
</div>

<div class="content">
	<div class="fold">
		<div class="intro">
			<h2>Oh,{'\n'}Hello!</h2>
			<p>
				My name's <strong>Christian</strong> and I'm a software engineer based in San Francisco.
			</p>
			<p>
				Over my decade&#8209;and&#8209;a&#8209;half long career, I've worked on
				<strong>platform</strong>,
				<strong>product</strong>, and <strong>user experience</strong> engineering teams as both an engineering
				manager and an individual contributor.
			</p>
		</div>
		<Footer />
	</div>
	{#each data.posts as post}
		<article>
			<a href={post.slug}>{post.title}</a>
		</article>
	{/each}
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
		gap: var(--space-12);
		grid-template-rows: 100%;
	}

	.fold {
		display: grid;
		align-content: end;
		gap: var(--space-12);
	}

	.intro {
		width: 100%;
		max-width: 32ch;
		min-height: 100%;
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
		margin-bottom: var(--space-4);
		font-size: var(--text-sm);
		font-weight: 300;
		line-height: var(--leading-body);
	}

	p:last-of-type {
		margin-bottom: var(--space-0);
	}

	strong {
		color: var(--color-emphasis);
		font-style: normal;
		font-weight: 600;
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
