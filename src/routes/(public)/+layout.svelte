<script lang="ts">
	import { onMount } from 'svelte';

	import Footer from './Footer.svelte';
	import Header from './Header.svelte';

	import type { LayoutServerData } from './$types';

	import Loader from '$lib/components/Loader.svelte';
	import { theme } from '$lib/theme';

	export let data: LayoutServerData;

	let sceneLoader:
		| Promise<typeof import('$lib/components/DynamicBackground/Canvas.svelte')>
		| undefined;

	onMount(() => {
		sceneLoader = import('$lib/components/DynamicBackground/Canvas.svelte');
	});

	$theme.mode = data.theme;
</script>

<div class="canvas">
	{#if sceneLoader}
		{#await sceneLoader}
			<Loader />
		{:then { default: Scene }}
			<Scene />
		{/await}
	{/if}
</div>

<div class="container">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.canvas {
		position: fixed;
		z-index: 0;
		inset: 0;
	}

	.container {
		--width: 100%;
		--min-width: 20rem;
		--max-width: 80rem;
		display: grid;
		min-height: 100%;
		gap: var(--space-12);
		grid-template-rows: min-content auto min-content;
		padding-block: var(--space-5);
		padding-inline: var(--space-5);
	}

	main {
		width: var(--width);
		min-width: var(--min-width);
		max-width: var(--max-width);
		padding: 0 var(--space-4);
		margin: 0 auto;
	}

	@media screen and (min-width: 480px) {
		.container {
			padding-block: var(--space-8);
			padding-inline: var(--space-8);
		}
	}

	@media screen and (min-width: 800px) {
		.container {
			padding-block: var(--space-8);
			padding-inline: var(--space-16);
		}
	}
</style>
