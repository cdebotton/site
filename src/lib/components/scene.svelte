<script>
	import { indigoDark } from '@radix-ui/colors';
	import { indigo } from '@radix-ui/colors';
	import { Canvas, T } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { PCFSoftShadowMap } from 'three';

	import Floor from './floor.svelte';
	import Orb from './orb.svelte';

	import { theme } from '$lib/theme';

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

	$: fogColor = $theme.darkMode ? indigoDark.indigo1 : indigo.indigo1;

	/** @type {number} */
	let innerWidth;

	$: zoom = Math.min(50 * (innerWidth / 600), 50);
	$: console.log(zoom);
</script>

<svelte:window bind:innerWidth />
<svelte:body on:pointermove={moveCamera} />

<Canvas shadows shadowMapType={PCFSoftShadowMap}>
	<T.Fog attach="fog" near={10} far={48} color={fogColor} density={100} />
	<T.OrthographicCamera bind:ref={camera} {zoom} makeDefault position={[10, 20, 20]} />
	<T.DirectionalLight />
	<T.PointLight castShadow position.y={10} intensity={1} />
	<T.Group rotation.y={$cameraY} position.y={-4}>
		<Orb />
		<Floor />
	</T.Group>
</Canvas>
