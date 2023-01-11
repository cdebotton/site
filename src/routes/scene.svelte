<script>
	import { Canvas, T, InstancedMesh, Instance } from '@threlte/core';
	import { MeshBasicMaterial, PlaneGeometry } from 'three';

	/** @type {import('three').OrthographicCamera | undefined} */
	let camera;

	let crosses = Array.from({ length: 23 }, (_, y) => {
		return Array.from({ length: 23 }, (_, x) => {
			return { x, y };
		});
	}).flat();

	$: camera?.lookAt(0, 0, 0);
</script>

<Canvas>
	<T.OrthographicCamera bind:ref={camera} makeDefault zoom={80} position={[10, 20, 20]} />
	<T.GridHelper args={[100, 100, '#aaa', '#bbb']} position={[0, -0.01, 0]} />
	<InstancedMesh
		geometry={new PlaneGeometry(0.086, 0.35)}
		material={new MeshBasicMaterial({ color: '#fff' })}
	>
		{#each crosses as { x, y }}
			<T.Group position={[x * 3 - Math.floor(23 / 3) * 3, -0.01, y * 3 - Math.floor(23 / 3) * 3]}>
				<Instance rotation={{ x: -Math.PI / 2, y: 0, z: 0 }} />
				<Instance rotation={{ x: -Math.PI / 2, y: 0, z: Math.PI / 2 }} />
			</T.Group>
		{/each}
	</InstancedMesh>
</Canvas>
