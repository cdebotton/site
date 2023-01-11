<script>
	import { Canvas, T } from '@threlte/core';
	import { PCFSoftShadowMap } from 'three';
	import { spring } from 'svelte/motion';

	import Box from './box.svelte';
	import Floor from './floor.svelte';

	/** @type {import('@threlte/core').ThrelteContext}*/
	let ctx;

	/** @type {import('three').OrthographicCamera | undefined} */
	let camera;

	$: camera?.lookAt(0, 0, 0);

	let cameraY = spring(0);

	/**
	 * Spin the camera with the mouse movement.
	 * @param {PointerEvent} event
	 */
	function moveCamera(event) {
		let x = (event.clientX / window.innerWidth) * (Math.PI * (1 / 4));
		$cameraY = Math.cos(x);
	}
</script>

<svelte:body on:pointermove={moveCamera} />

<Canvas shadows shadowMapType={PCFSoftShadowMap}>
	<T.DirectionalLight />
	<T.PointLight castShadow position.y={10} intensity={1} />
	<T.OrthographicCamera bind:ref={camera} zoom={80} makeDefault position={[10, 20, 20]} />
	<T.Group rotation.y={$cameraY} position.y={-4}>
		<Box />
		<Floor />
	</T.Group>
</Canvas>
