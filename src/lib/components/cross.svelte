<script lang="ts">
	import { T, Instance } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { degToRad } from 'three/src/math/MathUtils';

	export let x: number;
	export let y: number;

	$: n = x * y;

	let scale = spring(0, { stiffness: 0.1 });
	let rotation = spring(degToRad(-90), { damping: 0.25, stiffness: 0.05 });
	let drop = spring(0.72);

	onMount(() => {
		setTimeout(() => {
			$scale = 1;
			$rotation = 0;
			$drop = -0.01;
		}, n * 15);
	});
</script>

<T.Group
	scale={$scale}
	rotation.y={$rotation}
	position={[x * 3 - Math.floor(23 / 3) * 3, $drop, y * 3 - Math.floor(23 / 3) * 3]}
>
	<Instance rotation={{ x: -Math.PI / 2, y: 0, z: 0 }} />
	<Instance rotation={{ x: -Math.PI / 2, y: 0, z: Math.PI / 2 }} />
</T.Group>
