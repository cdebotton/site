<script lang="ts">
	import { Instance, InstancedMesh, useFrame } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { Color } from 'three';
	import { MeshBasicMaterial } from 'three';
	import { SphereGeometry } from 'three';

	import { colors } from './colors';

	export let moonCount = 750;
	export let orbitRadius = 5;

	// Setup moons
	let moonData = Array.from({ length: moonCount }, (_, i) => {
		let distance = Math.random() * orbitRadius;
		let speed = (distance + 2) * (1 / 10);
		return {
			key: i,
			scale: Math.random() * 0.5 + 0.05,
			seed: Math.random() * 51421,
			distance: distance + 4,
			y: Math.sin(i),
			x: 0,
			z: 0,
			speed,
			delay: distance * 200 + 1000
		};
	});

	let moonSprings = spring(
		Array.from({ length: moonCount }, () => {
			return {
				scale: 0.01
			};
		}),
		{ precision: 0.001 }
	);

	onMount(() => {
		moonData.forEach(({ delay }, i) => {
			setTimeout(() => {
				moonSprings.update((springs) => {
					springs[i].scale = 1;
					return springs;
				});
			}, delay);
		});
	});

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime();

		moonData.forEach((moon) => {
			let { speed, seed, distance } = moon;
			let t1 = t * speed + seed;
			moon.x = Math.sin(t1) * distance;
			moon.z = Math.cos(t1) * distance;
		});

		moonData = moonData;
	});
</script>

<!-- Moons -->
<InstancedMesh
	receiveShadow
	castShadow
	geometry={new SphereGeometry()}
	material={new MeshBasicMaterial()}
>
	{#each moonData as { key, x, y, z, scale }, i (key)}
		<Instance
			scale={scale * $moonSprings[i].scale}
			color={new Color($colors.fgSubtle)}
			position={{ x, y, z }}
		/>
	{/each}
</InstancedMesh>
