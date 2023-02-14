<script lang="ts">
	import { Instance, useFrame } from '@threlte/core';
	import { colors } from './colors';

	export let scale: number;
	export let seed: number;
	export let distance: number;
	export let y: number;
	export let speed: number;

	let x = 0;
	let z = 0;

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime() * speed + seed;
		x = Math.sin(t) * distance;
		z = Math.cos(t) * distance;
	});
</script>

<Instance {scale} color={$colors.fgSubtle} position={{ x, y, z }} />
