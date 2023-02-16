<script lang="ts">
	import { Instance, useFrame } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	import { colors } from './colors';

	export let scale: number;
	export let seed: number;
	export let distance: number;
	export let y: number;
	export let speed: number;
	export let delay: number;

	let x = 0;
	let z = 0;

	let scaleMultiplier = spring(0.01, { precision: 0.001 });

	onMount(() => {
		setTimeout(() => {
			$scaleMultiplier = 1;
		}, delay);
	});

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime() * speed + seed;
		x = Math.sin(t) * distance;
		z = Math.cos(t) * distance;
	});
</script>

<Instance scale={scale * $scaleMultiplier} color={$colors.fgSubtle} position={{ x, y, z }} />
