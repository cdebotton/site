<script lang="ts">
	import { red, plumDark } from '@radix-ui/colors';
	import { T, useFrame, InstancedMesh } from '@threlte/core';
	import { Edges } from '@threlte/extras';
	import { quadInOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	import { OctahedronGeometry, SphereGeometry, MeshToonMaterial } from 'three';

	import Moon from './Moon.svelte';

	import { theme } from '$lib/theme';

	$: color = $theme.mode === 'VAPORWAVE' ? plumDark.plum2 : red.red9;
	$: edgeColor = $theme.mode === 'VAPORWAVE' ? plumDark.plum10 : red.red11;

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

	let delta = 50;
	let time = 0;
	const COUNT = 500;
	let moons = Array.from({ length: COUNT }, (_, i) => {
		time += delta;

		let moon = {
			index: COUNT - i,
			scale: Math.random() * 0.378 + 0.015,
			distance: Math.random() * 5 + 1,
			speed: (i / COUNT) * 1.2,
			seed: Math.random() * 5235928,
			delay: time
		};

		delta *= 0.985;

		return moon;
	});
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
