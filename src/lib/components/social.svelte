<script>
	/** @type {string} */
	export let href;

	/** @type {string} */
	export let title;
</script>

<a target="_blank" {title} rel="noreferrer" {href}>
	<slot />
</a>

<style>
	a {
		display: inline-block;
		border-radius: 7px;
		background-color: var(--mauve4);
		color: var(--indigo12);
		font-size: var(--text-md);
		padding-block: var(--space-2);
		padding-inline: var(--space-3);
	}

	@media not all and (hover: none) {
		a:hover {
			background-color: var(--mauve5);
		}
	}
</style>
