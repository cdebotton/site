<script>
	import { indigo, slate } from '@radix-ui/colors';
	import { T, InstancedMesh } from '@threlte/core';
	import { MeshBasicMaterial, PlaneGeometry } from 'three';

	import Cross from './cross.svelte';

	import { theme } from '$lib/theme';

	export let y = 0;

	/** @type {import('three').OrthographicCamera | undefined} */
	let camera;

	let crosses = Array.from({ length: 23 }, (_, y) => {
		return Array.from({ length: 23 }, (_, x) => {
			return { x, y };
		});
	}).flat();

	$: gridColor = $theme.darkMode ? 'hsl(229, 24.0%, 1.95%)' : indigo.indigo7;
	$: crossColor = $theme.darkMode ? 'hsl(229, 24.0%, 3.83%)' : slate.slate5;
	$: shadowColor = $theme.darkMode ? '#000' : indigo.indigo1;

	$: camera?.lookAt(0, 0, 0);
</script>

<T.Group position.y={y}>
	<T.Mesh position.y={[-0.02]} receiveShadow rotation.x={-Math.PI / 2}>
		<T.PlaneGeometry args={[100, 100]} />
		<T.ShadowMaterial opacity={0.2} color={shadowColor} />
	</T.Mesh>
	<T.GridHelper args={[100, 100, gridColor, gridColor]} position={[0, -0.01, 0]} />
	<InstancedMesh
		geometry={new PlaneGeometry(0.086, 0.35)}
		material={new MeshBasicMaterial({ color: crossColor })}
	>
		{#each crosses as { x, y }}
			<Cross {x} {y} />
		{/each}
	</InstancedMesh>
</T.Group>
