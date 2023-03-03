<script lang="ts">
	import { Instance, InstancedMesh, T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { MeshBasicMaterial } from 'three';
	import { Color } from 'three';

	import { colors } from './colors';

	// Setup floor
	let { gltf: crossGltf } = useGltf('/assets/glb/cross-fancy.glb');

	export let size = 50;
	export let gap = 2;

	const EDGE_NODES = size / gap + 1;

	let crossData = Array.from({ length: EDGE_NODES }, (_, z) => {
		return Array.from({ length: EDGE_NODES }, (_, x) => {
			let key = z * EDGE_NODES + x;
			return {
				key,
				x: x * gap - size / 2,
				z: z * gap - size / 2,
				delay:
					Math.sqrt(Math.pow(x - EDGE_NODES / 2, 2) + Math.pow(Math.abs(z - EDGE_NODES / 2), 2)) *
					100
			};
		});
	}).flat();

	let crossSprings = spring(
		crossData.map(
			() => {
				return {
					scale: 0.01,
					y: 1
				};
			},
			{ damping: 0.125, stiffness: 0.01 }
		)
	);

	onMount(() => {
		crossData.forEach(({ delay }, i) => {
			setTimeout(() => {
				crossSprings.update((springs) => {
					springs[i].scale = 1;
					springs[i].y = 0.02;
					return springs;
				});
			}, delay);
		});
	});
</script>

<!-- Floor -->
<T.Group position.y={-4}>
	<T.Mesh receiveShadow rotation.x={Math.PI / -2}>
		<T.PlaneGeometry args={[100, 100]} />
		<T.ShadowMaterial color={0x000000} opacity={0.2} />
	</T.Mesh>
	<T.GridHelper args={[size, size, $colors.surfaceSubtle, $colors.surfaceSubtle]} />
	{#if $crossGltf}
		<InstancedMesh geometry={$crossGltf.nodes['cross'].geometry} material={new MeshBasicMaterial()}>
			{#each crossData as { key, x, z }, i (key)}
				<Instance
					color={new Color($colors.surfaceSubtle2)}
					position={{ x, y: $crossSprings[i].y, z }}
					scale={{ x: $crossSprings[i].scale, y: 1, z: $crossSprings[i].scale }}
				/>
			{/each}
		</InstancedMesh>
	{/if}
</T.Group>
