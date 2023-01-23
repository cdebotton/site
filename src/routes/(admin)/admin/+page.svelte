<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';

	import Button from '$lib/components/button.svelte';
</script>

<Button on:click={() => signOut()}>Logout</Button>
