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
		font-size: var(--text-md);
		font-weight: 900;
		letter-spacing: var(--tracking-tighter);
		text-transform: uppercase;
	}

	@media not all and (hover: none) {
		button:hover {
			color: var(--plum11);
		}
	}

	@media screen and (min-width: 480px) {
		button {
			font-size: var(--text-xl);
		}
	}
</style>
