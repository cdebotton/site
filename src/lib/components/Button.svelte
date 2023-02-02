<button on:click>
	<slot />
</button>

<style>
	button {
		padding: var(--space-2);
		border: none;
		border-radius: 3px;
		background-color: var(--indigo-9);
	}

	button:not([disabled]) {
		cursor: pointer;
	}
</style>
