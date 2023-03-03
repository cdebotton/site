<script lang="ts">
	import ContactItem from './ContactItem.svelte';
	import Experience from './Experience.svelte';
	import SectionTitle from './SectionTitle.svelte';

	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<div class="layout">
	<header>
		<ul>
			<li>
				<ContactItem label="Email">{import.meta.env.VITE_PUBLIC_EMAIL}</ContactItem>
			</li>
			<li>
				<ContactItem label="Phone">{import.meta.env.VITE_PUBLIC_PHONE_NUMBER}</ContactItem>
			</li>
			<li>
				<ContactItem label="Web">cdb.dev</ContactItem>
			</li>
		</ul>
	</header>
	<div class="block">
		<div class="introduction">
			<h1>Christian{'\n'}de Botton</h1>
			<p>
				I&apos;m a software engineer with 15 years of experience based in San Francisco. Over my
				decade&dash;and&dash;a&dash;half long career, I've worked on platform, product, and user
				experience engineering teams as both an engineering manager and an individual contributor.
			</p>
		</div>
		<SectionTitle>Education</SectionTitle>
	</div>
	<div class="block">
		<SectionTitle>Experience</SectionTitle>
		{#each data.jobs as job}
			<div class="job">
				<h3>{job.company}</h3>
				{#each job.experiences as experience}
					<Experience {...experience} />
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.introduction {
		display: grid;
		padding-bottom: var(--space-6);
		gap: var(--space-6);
	}

	.introduction p {
		text-indent: var(--space-4);
	}

	h1 {
		color: var(--color-accent);
		font-size: var(--text-4xl);
		font-weight: 800;
		letter-spacing: var(--tracking-tight);
		line-height: 1;
		text-transform: uppercase;
		white-space: pre;
	}

	h3 {
		font-size: var(--text-lg);
		font-weight: 600;
		letter-spacing: var(--tracking-wide);
		line-height: var(--leading-heading);
		text-transform: uppercase;
	}

	.layout {
		display: grid;
		max-width: 60rem;
		height: 100%;
		padding: var(--space-8) var(--space-4);
		margin: 0 auto;
		color: var(--color-text);
		gap: var(--space-12) var(--space-4);
		grid-template-columns: 4fr 5fr;
		grid-template-rows: min-content auto;
	}

	.block {
		display: flex;
		flex-flow: column;
		gap: var(--space-4);
	}

	header {
		padding-top: var(--space-2);
		grid-column: span 2;
	}

	header ul {
		display: flex;
		justify-content: space-between;
	}

	ul li {
		display: flex;
		flex-flow: column;
	}
</style>
