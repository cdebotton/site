<script lang="ts">
	import Logo from './logo.svelte';
	import ThemeToggle from './theme-toggle.svelte';

	import type { LayoutServerData } from './$types';

	import '$lib/css/base.css';
	import { browser } from '$app/environment';
	import { theme } from '$lib/theme';

	const DARK_THEME = 'dark-theme';

	export let data: LayoutServerData;

	$theme.darkMode = data.theme?.darkMode ?? true;

	$: if (browser && $theme.darkMode) {
		document.documentElement.classList.add(DARK_THEME);
	} else if (browser && $theme.darkMode === false) {
		document.documentElement.classList.remove(DARK_THEME);
	}
</script>

<svelte:head>
	{@html `<script>if (${$theme.darkMode}) document.documentElement.classList.add('${DARK_THEME}');</script>`}
</svelte:head>

<div>
	<header>
		<span class="logo">
			<Logo />
		</span>
	</header>
	<main>
		<slot />
	</main>
	<span class="theme-toggle">
		<ThemeToggle />
	</span>
</div>

<style>
	div {
		display: grid;
		height: 100%;
		gap: var(--space-12);
		grid-template-rows: min-content auto;
		justify-items: center;
		padding-block: var(--space-5);
		padding-inline: var(--space-5);
	}

	header,
	main {
		width: 100%;
		min-width: 20rem;
		max-width: 64rem;
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

	.theme-toggle {
		position: absolute;
		inset: auto var(--space-4) var(--space-8) auto;
	}

	@media screen and (min-width: 480px) {
		div {
			padding-block: var(--space-8);
			padding-inline: var(--space-8);
		}

		.theme-toggle {
			inset: auto var(--space-10) var(--space-10) auto;
		}
	}
</style>
