<script>
	import { signIn } from '@auth/sveltekit/client';

	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	if ($page.data.session) {
		goto('/admin');
	}
</script>

<button on:click={() => signIn('github')}>Login with Github</button>
