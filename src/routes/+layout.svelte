<script lang="ts">
	import '$lib/css/base.css';

	import Header from './Header.svelte';

	import type { LayoutServerData } from './$types';

	import { theme } from '$lib/theme';

	export let data: LayoutServerData;

	$theme.mode = data.theme;
</script>

<div class="container">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.container {
		--width: 100%;
		--min-width: 20rem;
		--max-width: 80rem;
		display: grid;
		min-height: 100%;
		gap: var(--space-12);
		grid-template-rows: min-content auto;
		padding-block: var(--space-5);
		padding-inline: var(--space-5);
	}

	main {
		width: var(--width);
		min-width: var(--min-width);
		max-width: var(--max-width);
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
