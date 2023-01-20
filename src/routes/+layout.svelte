<script lang="ts">
	import '$lib/css/base.css';

	import type { LayoutServerData } from './$types';

	import { browser } from '$app/environment';
	import { theme } from '$lib/theme';

	export let data: LayoutServerData;

	$theme.darkMode = data.theme?.darkMode ?? true;
	$: isDarkMode = $theme.darkMode;

	$: if (browser && $theme.darkMode) {
		document.documentElement.setAttribute('data-dark', 'true');
	} else if (browser && $theme.darkMode === false) {
		document.documentElement.setAttribute('data-dark', 'false');
	}
</script>

<svelte:head>
	{@html `<script>document.documentElement.setAttribute('data-dark', '${isDarkMode}');</script>`}
</svelte:head>

<slot />
