<script lang="ts">
	import Logo from './logo.svelte';
	import ThemeToggle from './theme-toggle.svelte';

	import type { LayoutServerData } from './$types';

	import '$lib/css/base.css';
	import { browser } from '$app/environment';
	import Glass from '$lib/icons/glass.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Mastodon from '$lib/icons/mastodon.svelte';
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
	<footer class="connect">
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
		<ThemeToggle />
	</footer>
</div>

<style>
	div {
		display: grid;
		height: 100%;
		gap: var(--space-12);
		grid-template-rows: min-content auto min-content;
		justify-items: center;
		padding-block: var(--space-5);
		padding-inline: var(--space-5);
	}

	header,
	main,
	footer {
		width: 100%;
		min-width: 20rem;
		max-width: 80rem;
	}

	header,
	footer {
		position: relative;
		z-index: 10;
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

	.connect {
		display: flex;
		width: 100%;
		justify-content: space-between;
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
