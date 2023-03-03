<script lang="ts">
	import { T, Three, useFrame } from '@threlte/core';
	import { Edges } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';

	import { MeshTransmissionMaterial } from './TransmissionMaterial';
	import { colors } from './colors';

	// Setup planet
	let planetRotationX = 0;
	let planetRotationZ = 0;
	let planetScale = spring(0, {
		precision: 0.000001,
		damping: 0.175,
		stiffness: 0.075
	});

	useFrame(({ clock }) => {
		let t = clock.getElapsedTime();

		planetRotationX = Math.sin(t);
		planetRotationZ = Math.cos(t);
	});

	onMount(() => {
		setTimeout(() => {
			$planetScale = 1;
		}, 500);
	});
</script>

<!-- Planet -->
<T.Mesh castShadow scale={$planetScale} rotation={[planetRotationX, 0, planetRotationZ]}>
	<T.BoxGeometry args={[4, 4, 4]} />
	<Three
		type={MeshTransmissionMaterial}
		clearcoat={1}
		reflectivity={10}
		distortion={1.2}
		ior={1.5}
		thickness={2}
		roughness={0.325}
		specularIntensity={1}
		distortionScale={0.25}
		transmission={1.0}
		temporalDistortion={0.3}
		background={$colors.surface}
		color={$colors.fg}
		args={[8]}
	/>
	<Edges color={$colors.accent} />
</T.Mesh>

<T.Mesh scale={$planetScale * 0.5} rotation={[planetRotationX, 0, planetRotationZ]}>
	<T.SphereGeometry args={[3]} />
	<T.MeshToonMaterial emissive={$colors.fg} emissiveIntensity={5} color={$colors.fg} />
</T.Mesh>
