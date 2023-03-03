<script lang="ts">
	export let disabled = false;
	export let variant: 'primary' | 'secondary' = 'primary';
	export let outline = false;
	export let type: svelteHTML.IntrinsicElements['button']['type'] = 'submit';
</script>

<button class={variant} class:outline on:click {disabled} {type}>
	<slot />
</button>

<style>
	button {
		padding: var(--space-2);
		border: none;
		border-radius: 3px;
		background-color: var(--indigo-9);
	}

	button:not(:disabled) {
		cursor: pointer;
	}

	.primary {
	}

	.secondary {
	}

	.outline {
	}

	button:disabled {
	}
</style>
