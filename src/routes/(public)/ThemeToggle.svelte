<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
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
	<Button type="submit">
		{#if $theme.mode === 'VAPORWAVE'}
			EVA-02
		{:else}
			Vaporwave
		{/if}
	</Button>
</form>

<style>
	button {
		border: none;
		background: none;
		color: inherit;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
		font-weight: 900;
		letter-spacing: var(--tracking-tighter);
		line-height: var(--leading-none);
		text-transform: uppercase;
	}

	@media not all and (hover: none) {
		button:hover {
			color: var(--color-accent);
		}
	}
</style>
