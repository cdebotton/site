<script lang="ts">
	import Logo from './Logo.svelte';
</script>

<header>
	<span class="logo">
		<Logo />
	</span>
</header>

<style>
	header {
		top: var(--space-4);
		display: flex;
		width: var(--width);
		min-width: var(--min-width);
		max-width: var(--max-width);
		align-items: flex-start;
		margin: 0 auto;
	}

	.logo {
		position: relative;
		grid-column: 2 / span 1;
	}
</style>
