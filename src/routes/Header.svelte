<script lang="ts">
	import Logo from './Logo.svelte';

	let scrollY: number;
	$: shift = Math.min(-1 * (112 - scrollY), 0);
	$: progress = (112 + shift) / 112;
</script>

<svelte:window bind:scrollY />

<header>
	<!-- <div style={`transform: translateY(${shift}px);`} class="surface" /> -->
	<span class="logo">
		<Logo --progress={progress} />
	</span>
</header>

<style>
	/* .surface {
		position: absolute;
		height: 7rem;
		background-color: var(--color-surface);
		inset: calc(-1 * var(--space-8)) calc(-1 * var(--space-16)) auto calc(-1 * var(--space-16));
	} */

	header {
		position: sticky;
		margin: 0 auto;
		z-index: 10;
		top: var(--space-4);
		display: flex;
		width: var(--width);
		min-width: var(--min-width);
		max-width: var(--max-width);
		align-items: flex-start;
	}

	.logo {
		position: relative;
		grid-column: 2 / span 1;
	}
</style>
