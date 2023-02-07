<script lang="ts">
	import { InstancedMesh } from '@threlte/core';
	import { MeshToonMaterial, SphereGeometry } from 'three';

	import Moon from './Moon.svelte';

	let geometry = new SphereGeometry();
	let material = new MeshToonMaterial();

	let delta = 50;
	let time = 0;
	export let count = 500;
	let moons = Array.from({ length: count }, (_, i) => {
		time += delta;

		let moon = {
			index: count - i,
			scale: Math.random() * 0.378 + 0.015,
			distance: Math.random() * 5 + 1,
			speed: (i / count) * 1.2,
			seed: Math.random() * 5235928,
			delay: time
		};

		delta *= 0.985;

		return moon;
	});
</script>

<group position.y="3">
	<InstancedMesh castShadow {geometry} {material}>
		{#each moons as { index, ...moon } (index)}
			<Moon {...moon} />
		{/each}
	</InstancedMesh>
</group>
