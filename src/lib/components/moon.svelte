<script>
	import { indigoDark, indigo } from '@radix-ui/colors';
	import { Instance, useFrame } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	import { theme } from '$lib/theme';

	/** @type {number} */
	export let index;

	/** @type {number} */
	export let scale;

	/** @type {number} */
	export let distance;

	/** @type {number} */
	export let speed;

	/** @type {number} */
	export let seed;

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

	$: color = $theme.darkMode ? 'hsl(229, 24.0%, 2%)' : 'hsl(226, 75.4%, 98.5%)';

	let realScale = spring(0);

	onMount(() => {
		realScale.set(scale);
	});
</script>

<Instance {color} position={{ z, x, y }} scale={$realScale} />
