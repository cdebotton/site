<script lang="ts">
	import { Instance } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { colors } from './colors';

	export let x: number;
	export let z: number;
	export let delay: number;

	let scale = spring(0, { damping: 0.125, stiffness: 0.1 });
	let y = spring(1, { damping: 1, stiffness: 0.1 });

	onMount(() => {
		setTimeout(() => {
			scale.set(1);
			y.set(0.02);
		}, delay);
	});
</script>

<Instance
	color={$colors.surfaceSubtle2}
	position={{ x, y: $y, z }}
	scale={{ x: 0.04 * $scale, y: 1, z: 0.125 * $scale }}
/>
