<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	import Button from '$lib/components/button.svelte';
</script>

<div>
	<header>
		<h1>Admin</h1>
		<Button on:click={() => signOut()}>Logout</Button>
	</header>
	<aside>
		<ul>
			<li>Home</li>
			<li>Posts</li>
			<li>Photos</li>
			<li>Albums</li>
			<li>Videos</li>
		</ul>
	</aside>
	<main>
		<slot />
	</main>
</div>

<style>
	div {
		display: grid;
		gap: 0 var(--space-12);
		grid-template-columns: min-content auto;
	}

	header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		background-color: var(--indigo-dark-2);
		grid-column: span 2;
		padding-block: var(--space-2) var(--space-2);
		padding-inline: var(--space-12);
	}

	h1 {
		font-size: var(--text-xl);
		font-weight: 900;
		letter-spacing: var(--tracking-tight);
	}

	aside {
		padding-block-start: var(--space-6);
		padding-inline-start: var(--space-12);
	}

	main {
		padding-block-start: var(--space-6);
		padding-inline-end: var(--space-12);
	}
</style>
