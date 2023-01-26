<script lang="ts">
	import { plumDark, red } from '@radix-ui/colors';
	import { Instance, useFrame } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	import { theme } from '$lib/theme';

	export let scale: number;
	export let distance: number;
	export let speed: number;
	export let seed: number;

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

	let realScale = spring(0, {
		stiffness: 0.02,
		damping: 0.05,
		precision: 0.001
	});

	onMount(() => {
		$realScale = scale;
	});

	$: color = $theme.darkMode ? plumDark.plum3 : red.red8;
</script>

<Instance {color} position={{ z, x, y }} scale={$realScale} />
