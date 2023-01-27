<script lang="ts">
	import '$lib/css/base.css';

	import Footer from './footer.svelte';
	import Logo from './logo.svelte';

	import type { LayoutServerData } from './$types';

	import { theme } from '$lib/theme';

	export let data: LayoutServerData;

	$theme.darkMode = data.theme?.darkMode ?? true;
</script>

<div>
	<header>
		<span class="logo">
			<Logo />
		</span>
	</header>
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	div {
		--width: 100%;
		--min-width: 20rem;
		--max-width: 80rem;
		display: grid;
		height: 100%;
		gap: var(--space-12);
		grid-template-rows: min-content auto min-content;
		justify-items: center;
		padding-block: var(--space-5);
		padding-inline: var(--space-5);
	}

	header,
	main {
		width: var(--width);
		min-width: var(--min-width);
		max-width: var(--max-width);
	}

	header {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
	}

	.logo {
		grid-column: 2 / span 1;
	}

	@media screen and (min-width: 480px) {
		div {
			padding-block: var(--space-8);
			padding-inline: var(--space-8);
		}
	}

	@media screen and (min-width: 800px) {
		div {
			padding-block: var(--space-8);
			padding-inline: var(--space-16);
		}
	}
</style>
