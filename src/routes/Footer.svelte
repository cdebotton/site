<script lang="ts">
	import Social from './Social.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	import Github from '$lib/components/icons/Github.svelte';
	import Glass from '$lib/components/icons/Glass.svelte';
	import Linkedin from '$lib/components/icons/Linkedin.svelte';
	import Mastodon from '$lib/components/icons/Mastodon.svelte';
</script>

<footer>
	<ul>
		<li>
			<Social title="Judge my code on Github" href="https://github.com/cdebotton">
				<Github />
			</Social>
		</li>
		<li>
			<Social
				title="View my work history at Linkedin"
				href="https://linkedin.com/in/christiandebotton"
			>
				<Linkedin />
			</Social>
		</li>
		<li>
			<Social title="Check out my photography on Glass" href="https://glass.photo/cdb">
				<Glass />
			</Social>
		</li>
		<li>
			<Social title="Just me, shouting into the void on Mastodon" href="https://mas.to/@cdebotton">
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
