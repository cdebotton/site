<script lang="ts">
	import { red, plumDark } from '@radix-ui/colors';
	import { T, useFrame, InstancedMesh } from '@threlte/core';
	import { Edges } from '@threlte/extras';
	import { quadInOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	import { OctahedronGeometry, SphereGeometry, MeshToonMaterial } from 'three';

	import Moon from './moon.svelte';

	import { theme } from '$lib/theme';

	$: color = $theme.darkMode ? plumDark.plum2 : red.red9;
	$: edgeColor = $theme.darkMode ? plumDark.plum10 : red.red11;

	let y: number;

	let rotationY = 0;
	let rotationZ = 0;
	let scale = spring(0, { damping: 0.035, stiffness: 0.005, precision: 0.001 });

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime();

		rotationY = Math.sin(t);
		rotationZ = Math.cos(t);

		let x = quadInOut((t / 8) % 1) * Math.PI;

		y = Math.sin(x) * 4 + 5;
	});

	setTimeout(() => {
		$scale = 3;
	}, 750);

	let geometry = new SphereGeometry();
	let material = new MeshToonMaterial();

	type TMoon = {
		index: number;
		scale: number;
		distance: number;
		speed: number;
		seed: number;
	};

	function* moonGenerator(count: number) {
		for (let i = 0; i < count; i += 1) {
			let moon = {
				index: count - i,
				scale: Math.random() * 0.378 + 0.015,
				distance: Math.random() * 5 + 1,
				speed: (i / count) * 1.2,
				seed: Math.random() * 5235928
			};

			yield moon;
		}
	}

	async function delay(amount: number): Promise<void> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, amount);
		});
	}

	let moons: TMoon[] = [];
	let time = 50;

	(async () => {
		for (let moon of moonGenerator(500)) {
			moons.push(moon);
			await delay(time);
			moons = moons;
			time *= 0.99;
		}
	})();
</script>

<T.Group position.y={y}>
	<InstancedMesh castShadow {geometry} {material}>
		{#each moons as { index, ...moon } (index)}
			<Moon {...moon} />
		{/each}
	</InstancedMesh>
	<T.Mesh
		castShadow
		geometry={new OctahedronGeometry(1, 2)}
		material={new MeshToonMaterial({ color, transparent: true, opacity: 0.85 })}
		scale={$scale}
		rotation.y={rotationY}
		rotation.z={rotationZ}
	>
		<Edges color={edgeColor} />
	</T.Mesh>
</T.Group>
