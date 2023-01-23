<script lang="ts">
	export let href: string;
	export let title: string;
</script>

<a target="_blank" {title} rel="noreferrer" {href}>
	<slot />
</a>

<style>
	a {
		display: inline-block;
		color: var(--color-text);
		font-size: var(--text-md);
		padding-block: var(--space-2);
		padding-inline: var(--space-3);
	}

	@media not all and (hover: none) {
		a:hover {
			color: var(--color-accent);
		}
	}
</style>
