<script>
	import Social from './social.svelte';
	import ThemeToggle from './theme-toggle.svelte';

	import Github from '$lib/icons/github.svelte';
	import Glass from '$lib/icons/glass.svelte';
	import Linkedin from '$lib/icons/linkedin.svelte';
	import Mastodon from '$lib/icons/mastodon.svelte';
</script>

<footer>
	<ul>
		<li>
			<Social title="Github" href="https://github.com/cdebotton">
				<Github />
			</Social>
		</li>
		<li>
			<Social title="Linkedin" href="https://linkedin.com/in/christiandebotton">
				<Linkedin />
			</Social>
		</li>
		<li>
			<Social title="Glass" href="https://glass.photo/cdb">
				<Glass />
			</Social>
		</li>
		<li>
			<Social title="Mastodon" href="https://mas.to/@cdebotton">
				<Mastodon />
			</Social>
		</li>
	</ul>
	<ThemeToggle />
</footer>

<style>
	footer {
		position: relative;
		z-index: 10;
		display: flex;
		width: var(--width);
		min-width: var(--min-width);
		max-width: var(--max-width);
		justify-content: space-between;
	}

	ul {
		display: flex;
		gap: var(--space-4);
	}
</style>
