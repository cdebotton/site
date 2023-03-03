<script lang="ts">
	export let label: string;
</script>

<span class="label">{label}</span>
<span class="value">
	<slot />
</span>

<style>
	.label {
		color: var(--color-accent);
		font-size: var(--text-xs);
		font-weight: 800;
		letter-spacing: var(--tracking-tight);
		line-height: var(--leading-body);
		text-transform: uppercase;
	}

	.value {
		font-size: var(--text-xs);
		font-weight: 500;
		letter-spacing: var(--tracking-wide);
		line-height: var(--leading-none);
		text-transform: uppercase;
	}
</style>
