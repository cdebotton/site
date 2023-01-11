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
		<span class="theme-toggle">
			<ThemeToggle />
		</span>
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	div {
		display: grid;
		height: 100%;
		grid-template-rows: min-content auto;
		padding-inline: var(--space-5);
		padding-block: var(--space-5);
		justify-items: center;
		gap: var(--space-12);
	}

	header,
	main {
		max-width: 64rem;
		min-width: 20rem;
		width: 100%;
	}

	header {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		z-index: 10;
	}

	.logo {
		grid-column: 2 / span 1;
	}

	.theme-toggle {
		grid-column: 4;
	}

	@media screen and (min-width: 480px) {
		div {
			padding-inline: var(--space-8);
			padding-block: var(--space-8);
		}
	}
</style>
