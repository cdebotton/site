<script lang="ts">
	export let company: string | undefined = undefined;
	export let title: string;
	export let team: string;
	export let dates: [start: Date, end?: Date];
	export let details: string[] = [];

	function date(date?: Date) {
		if (!date) {
			return 'Now';
		}

		return new Intl.DateTimeFormat('en-us', {
			year: 'numeric',
			month: 'short'
		}).format(date);
	}
</script>

<div>
	{#if company}
		<h3>{company}</h3>
	{/if}

	<header>
		<h4>{title} - {team}</h4>
		<span>{date(dates[0])} - {date(dates[1])}</span>
	</header>
	<ul>
		{#each details as detail}
			<li>{detail}</li>
		{/each}
	</ul>
</div>

<style>
	div {
		padding: var(--space-1) 0;
	}
	span {
		display: inline-block;
		margin-bottom: var(--space-2);
		font-size: var(--text-sm);
		font-size: var(--text-xs);
		font-weight: 500;
	}

	h4 {
		font-size: var(--text-md);
		font-weight: 600;
	}

	ul {
		list-style-position: inside;
		list-style-type: '\29BF  ';
	}

	li {
		position: relative;
		margin-top: var(--space-3);
	}
</style>
