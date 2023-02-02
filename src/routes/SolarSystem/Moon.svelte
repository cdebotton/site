<script lang="ts">
	import { plumDark, red } from '@radix-ui/colors';
	import { Instance, useFrame } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	import { theme } from '$lib/theme';

	let targetScale: number;

	export { targetScale as scale };
	export let distance: number;
	export let speed: number;
	export let seed: number;
	export let delay: number;

	const RADIUS = 3;

	let z = 0;
	let x = 0;
	let y = 0;

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime() * speed + seed;
		z = -(RADIUS + distance) * Math.sin(t);
		x = -(RADIUS + distance) * Math.cos(t);
		y = 5 * Math.cos(t);
	});

	let scale = spring(0.0001, {
		stiffness: 0.02,
		damping: 0.05,
		precision: 0.001
	});

	onMount(() => {
		setTimeout(() => {
			$scale = targetScale;
		}, delay);
	});

	$: color = $theme.mode === 'VAPORWAVE' ? plumDark.plum3 : red.red8;
</script>

<Instance {color} position={{ x, y, z }} scale={$scale} />
