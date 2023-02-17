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
		isolation: isolate;
		position: relative;
		z-index: 10;
		display: flex;
		width: var(--width);
		margin: 0 auto;
		min-width: var(--min-width);
		max-width: var(--max-width);
		justify-content: space-between;
		padding: var(--space-2);
		align-items: center;
	}

	footer::before {
		z-index: -1;
		content: ' ';
		display: block;
		position: absolute;
		inset: 0;
		background-color: hsl(0 0% 100% / 0.03);
		backdrop-filter: blur(8px);
		border-radius: 7px;
	}

	:global([data-theme='EVA-02']) footer {
		background-color: hsl(0 0% 0% / 0.03);
	}

	ul {
		display: flex;
	}

	li {
		border-right: 1px solid hsl(0 0% 100% / 0.03);
		padding: 0 var(--space-4);
	}

	:global([data-theme='EVA-02']) li {
		border-right-color: hsl(0 0% 0% / 0.04);
	}
</style>
