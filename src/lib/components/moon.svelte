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

	const RADIUS = 3;

	let z = 0;
	let x = 0;
	let y = 0;

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime() * ((index + 1) / 250);
		z = -(RADIUS + distance) * Math.sin(t);
		x = -(RADIUS + distance) * Math.cos(t);
		y = 5 * Math.cos(t);
	});

	$: color = $theme.darkMode ? indigoDark.indigo4 : indigo.indigo8;

	let realScale = spring(0);

	onMount(() => {
		realScale.set(scale);
	});
</script>

<Instance {color} position={{ z, x, y }} scale={$realScale} />
