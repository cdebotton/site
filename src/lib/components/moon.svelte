<script>
	import { Instance, useFrame } from '@threlte/core';

	import { theme } from '$lib/theme';
	import { Vector3 } from 'three';

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

	$: color = $theme.darkMode ? 'hsl(229, 24.0%, 2%)' : 'hsl(226, 75.4%, 98.5%)';
</script>

<Instance {color} position={{ z, x, y }} scale={trueScale} />
