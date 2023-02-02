<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { parseTheme, theme } from '$lib/theme';

	let enhanceTheme: SubmitFunction = ({ action }) => {
		$theme.mode = parseTheme(action.searchParams.get('mode'));
	};

	$: toggleTo = $theme.mode === 'VAPORWAVE' ? 'EVA-02' : 'VAPORWAVE';
</script>

<form
	use:enhance={enhanceTheme}
	method="POST"
	action={`/?/setTheme&mode=${toggleTo}&redirectTo=${$page.url.pathname}`}
>
	<button type="submit">
		{#if $theme.mode === 'VAPORWAVE'}
			EVA-02
		{:else}
			Vaporwave
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
