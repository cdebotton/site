<script>
	import { indigoDark, indigo } from '@radix-ui/colors';
	import { Canvas, T } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { ColorManagement, PCFSoftShadowMap } from 'three';

	import Effects from './effects.svelte';
	import Floor from './floor.svelte';
	import Orb from './orb.svelte';

	import { browser } from '$app/environment';
	import { theme } from '$lib/theme';

	/**
	 * Spin the camera with the mouse movement.
	 * @param {PointerEvent} event
	 */
	function moveCamera(event) {
		if (isTouch) {
			return;
		}

		let x = (event.clientX / window.innerWidth) * Math.PI;
		$cameraY = Math.cos(x) - Math.PI;
	}

	/** @type {boolean} */
	let isTouch;
	$: if (browser && matchMedia('not all and (hover: none)').matches) {
		isTouch = false;
	} else {
		isTouch = true;
	}

	/** @type {import('three').OrthographicCamera | undefined} */
	let camera;
	/** @type {import('svelte/motion').Spring<number>} */
	let cameraY = spring(0);
	/** @type {number} */
	let innerWidth;

	$: camera?.lookAt(0, 0, 0);
	$: fogColor = $theme.darkMode ? indigoDark.indigo1 : indigo.indigo1;
	$: zoom = Math.min(50 * (innerWidth / 600), 50);

	ColorManagement.legacyMode = false;

	/** @type {import('@threlte/core').ThrelteContext} */
	let ctx;

	$: ctx?.renderer?.setClearColor($theme.darkMode ? indigoDark.indigo1 : indigo.indigo1);
</script>

<svelte:window bind:innerWidth />
<svelte:body on:pointermove={moveCamera} />

<Canvas bind:ctx rendererParameters={{ alpha: false }} shadows shadowMapType={PCFSoftShadowMap}>
	<T.Fog attach="fog" near={20} far={45} color={fogColor} density={100} />
	<T.OrthographicCamera bind:ref={camera} {zoom} makeDefault position={[10, 20, 20]} />
	<T.DirectionalLight />
	<T.PointLight castShadow position.y={10} intensity={1} />
	<T.Group rotation.y={$cameraY} position.y={-4}>
		<Orb />
		<Floor />
	</T.Group>
</Canvas>
