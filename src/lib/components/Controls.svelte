<script context="module" type="ts">
	import { writable } from 'svelte/store';

	export let focusDistance = writable(0.27);
	export let focalLength = writable(0.28);
	export let bokehScale = writable(40);
</script>

<div>
	<span>
		<label for="focusDistance">Focus distance: {$focusDistance}</label>
		<input
			bind:value={$focusDistance}
			id="focusDistance"
			min={0}
			max={1}
			type="range"
			step={0.01}
		/>
	</span>
	<span>
		<label for="focalLegth">Focal range: {$focalLength}</label>
		<input id="focalLength" bind:value={$focalLength} min={0} max={1} type="range" step={0.01} />
	</span>
	<span>
		<label for="bokehScale">Bokeh scale: {$bokehScale}</label>
		<input type="range" bind:value={$bokehScale} id="bokehScale" min={0} max={120} step={1} />
	</span>
</div>

<style>
	div {
		position: fixed;
		z-index: 100;
		top: 2rem;
		right: 2rem;
	}
</style>
