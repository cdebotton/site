<script>
	import Logo from './Logo.svelte';

	import { page } from '$app/stores';
</script>

<header>
	<Logo />
</header>

<h2>Oh no!</h2>
<p>{$page.error?.message}</p>
