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
	<link
		rel="preload"
		type="font/woff2"
		as="font"
		href="/assets/fonts/Inter.var-subset.woff2"
		crossorigin=""
	/>
	<style>
		@font-face {
			font-display: swap;
			font-family: 'Inter var';
			font-named-instance: 'Regular';
			font-style: normal;
			font-weight: 100 900;
			src: url('/assets/fonts/Inter.var-subset.woff2') format('woff2');
			unicode-range: U+0-FF, U+131, U+152, U+153, U+2BB, U+2BC, U+2C6, U+2DA, U+2DC, U+2000-206F,
				U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}

		@font-face {
			ascent-override: 92.08%;
			descent-override: 22.95%;
			font-family: 'Inter var Fallback';
			font-style: normal;
			font-weight: 900;
			line-gap-override: 0%;
			size-adjust: 105.21%;
			src: local('Arial Bold');
			unicode-range: U+0-FF, U+131, U+152, U+153, U+2BB, U+2BC, U+2C6, U+2DA, U+2DC, U+2000-206F,
				U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}

		@font-face {
			ascent-override: 94.12%;
			descent-override: 23.46%;
			font-family: 'Inter var Fallback';
			font-style: normal;
			font-weight: 800;
			line-gap-override: 0%;
			size-adjust: 102.92%;
			src: local('Arial Bold');
			unicode-range: U+0-FF, U+131, U+152, U+153, U+2BB, U+2BC, U+2C6, U+2DA, U+2DC, U+2000-206F,
				U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}

		@font-face {
			ascent-override: 95.19%;
			descent-override: 23.73%;
			font-family: 'Inter var Fallback';
			font-style: normal;
			font-weight: 700;
			line-gap-override: 0%;
			size-adjust: 101.77%;
			src: local('Arial Bold');
			unicode-range: U+0-FF, U+131, U+152, U+153, U+2BB, U+2BC, U+2C6, U+2DA, U+2DC, U+2000-206F,
				U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}

		@font-face {
			ascent-override: 88.98%;
			descent-override: 22.18%;
			font-family: 'Inter var Fallback';
			font-style: normal;
			font-weight: 400;
			line-gap-override: 0%;
			size-adjust: 108.87%;
			src: local('Arial');
			unicode-range: U+0-FF, U+131, U+152, U+153, U+2BB, U+2BC, U+2C6, U+2DA, U+2DC, U+2000-206F,
				U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
	</style>
</svelte:head>

<span class="logo">
	<Logo />
</span>
<slot />
<span class="theme-toggle">
	<ThemeToggle />
</span>

<style>
	:global(body) {
		font-family: 'Inter var', 'Inter var Fallback';
	}

	.logo,
	.theme-toggle {
		position: fixed;
	}

	.logo {
		inset-block: auto var(--space-8);
		inset-inline: var(--space-8) auto;
	}

	.theme-toggle {
		inset-block: auto var(--space-8);
		inset-inline: auto var(--space-8);
	}
</style>
