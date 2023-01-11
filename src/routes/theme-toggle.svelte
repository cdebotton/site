<script lang="ts">
	import { theme } from '$lib/theme';

	function toggle() {
		$theme.darkMode = !$theme.darkMode;
		document.cookie = `theme=${JSON.stringify($theme)}`;
	}
</script>

<button on:click={toggle}>
	{#if $theme.darkMode}
		Light
	{:else}
		Dark
	{/if}
</button>

<style>
	button {
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		font-weight: 900;
		letter-spacing: var(--tracking-tighter);
		text-transform: uppercase;
	}
</style>
