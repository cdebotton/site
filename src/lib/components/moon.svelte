<script>
	import { plumDark, red } from '@radix-ui/colors';
	import { Instance, useFrame } from '@threlte/core';
	import { Vector3 } from 'three';

	import { theme } from '$lib/theme';

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

	let trueScale = new Vector3(0, 0, 0);
	let targetScale = new Vector3(scale, scale, scale);

	useFrame(({ clock }, delta) => {
		let t = clock.getElapsedTime() * speed + seed;
		z = -(RADIUS + distance) * Math.sin(t);
		x = -(RADIUS + distance) * Math.cos(t);
		y = 5 * Math.cos(t);

		trueScale = trueScale.lerp(targetScale, delta);
	});

	$: color = $theme.darkMode ? plumDark.plum3 : red.red8;
</script>

<Instance {color} position={{ z, x, y }} scale={trueScale} />
