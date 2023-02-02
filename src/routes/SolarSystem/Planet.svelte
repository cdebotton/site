<script lang="ts">
	import { red, plumDark } from '@radix-ui/colors';
	import { T, useFrame } from '@threlte/core';
	import { Edges } from '@threlte/extras';
	import { quadInOut } from 'svelte/easing';
	import { spring } from 'svelte/motion';
	import { OctahedronGeometry, MeshToonMaterial } from 'three';

	import { theme } from '$lib/theme';

	$: color = $theme.mode === 'VAPORWAVE' ? plumDark.plum2 : red.red9;
	$: edgeColor = $theme.mode === 'VAPORWAVE' ? plumDark.plum10 : red.red11;

	let rotationY = 0;
	let rotationZ = 0;
	let scale = spring(0, { damping: 0.035, stiffness: 0.005, precision: 0.001 });

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime();

		rotationY = Math.sin(t);
		rotationZ = Math.cos(t);

		let x = quadInOut((t / 8) % 1) * Math.PI;
	});

	setTimeout(() => {
		$scale = 3;
	}, 750);
</script>

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
