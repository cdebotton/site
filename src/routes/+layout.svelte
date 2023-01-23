<script lang="ts">
	import '$lib/css/base.css';

	import { theme } from '$lib/theme';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$theme.darkMode = data.theme?.darkMode ?? true;
</script>

<slot />
