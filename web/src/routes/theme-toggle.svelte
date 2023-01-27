<script lang="ts">
	import { theme } from '$lib/theme';
	import { page } from '$app/stores';
	import { enhance, type SubmitFunction } from '$app/forms';

	let enhanceTheme: SubmitFunction = ({ action }) => {
		let darkMode = action.searchParams.get('darkMode');
		if (darkMode) {
			$theme.darkMode = darkMode === 'true';
		}
	};
</script>

<form
	use:enhance={enhanceTheme}
	method="POST"
	action={`/?/setTheme&darkMode=${!$theme.darkMode}&redirectTo=${$page.url.pathname}`}
>
	<button type="submit">
		{#if $theme.darkMode}
			Light
		{:else}
			Dark
		{/if}
	</button>
</form>

<style>
	button {
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		font-family: inherit;
		font-size: var(--text-sm);
		font-weight: 900;
		letter-spacing: var(--tracking-tighter);
		text-transform: uppercase;
	}

	@media not all and (hover: none) {
		button:hover {
			color: var(--color-accent);
		}
	}
</style>
