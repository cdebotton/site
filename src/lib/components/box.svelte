<script>
	import { T, useFrame } from '@threlte/core';
	import { Edges } from '@threlte/extras';
	import { slate, slateDark, plum, plumDark } from '@radix-ui/colors';
	import { theme } from '$lib/theme';
	import { spring, tweened } from 'svelte/motion';
	import { onMount } from 'svelte';
	import { cubicInOut } from 'svelte/easing';
	import { OctahedronGeometry, MeshToonMaterial } from 'three';

	$: color = $theme.darkMode ? plumDark.plum2 : plum.plum8;
	$: edgeColor = $theme.darkMode ? plumDark.plum10 : plum.plum11;

	const MIN_Y = 4;
	const MAX_Y = 6;

	let rotationY = 0;
	let rotationZ = 0;
	let scale = spring(0, { damping: 0.05, stiffness: 0.005 });
	let y = tweened(MIN_Y, {
		duration: 5000,
		easing: cubicInOut
	});

	useFrame(({ clock }) => {
		rotationY = Math.sin(clock.getElapsedTime());
		rotationZ = Math.cos(clock.getElapsedTime());
	});

	function drift() {
		y.update((value) => (value === MIN_Y ? MAX_Y : MIN_Y)).then(() => drift());
	}

	onMount(() => {
		drift();
		setTimeout(() => {
			$scale = 3;
		}, 750);
	});
</script>

<T.Mesh
	castShadow
	geometry={new OctahedronGeometry(1, 2)}
	material={new MeshToonMaterial({ color, transparent: true, opacity: 0.5 })}
	scale={$scale}
	position.y={$y}
	rotation.y={rotationY}
	rotation.z={rotationZ}
>
	<Edges color={edgeColor} />
</T.Mesh>
