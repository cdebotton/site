<script lang="ts">
	import { indigoDark, indigo } from '@radix-ui/colors';
	import { Canvas, T, type ThrelteContext } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { ColorManagement, PCFSoftShadowMap } from 'three';

	import Floor from './floor.svelte';
	import Orb from './orb.svelte';

	import { browser } from '$app/environment';
	import { theme } from '$lib/theme';
	import type { OrthographicCamera } from 'three';
	import Effects from './effects.svelte';

	/**
	 * Spin the camera with the mouse movement.
	 */
	function moveCamera(event: PointerEvent) {
		if (isTouch) {
			return;
		}

		let x = (event.clientX / window.innerWidth) * Math.PI;
		$cameraY = Math.cos(x) - Math.PI;
	}

	let isTouch: boolean;
	$: if (browser && matchMedia('not all and (hover: none)').matches) {
		isTouch = false;
	} else {
		isTouch = true;
	}

	let camera: OrthographicCamera | undefined;
	let cameraY = spring(0);
	let innerWidth: number;

	$: camera?.lookAt(0, 0, 0);
	$: fogColor = $theme.darkMode ? indigoDark.indigo1 : indigo.indigo1;
	$: zoom = Math.min(65 * (innerWidth / 800), 65);

	ColorManagement.legacyMode = false;

	let ctx: ThrelteContext;

	$: ctx?.renderer?.setClearColor($theme.darkMode ? indigoDark.indigo1 : indigo.indigo1);
</script>

<svelte:window bind:innerWidth />
<svelte:body on:pointermove={moveCamera} />

<Canvas bind:ctx rendererParameters={{ alpha: false }} shadows shadowMapType={PCFSoftShadowMap}>
	<T.Fog attach="fog" near={20} far={45} color={fogColor} density={100} />
	<T.OrthographicCamera bind:ref={camera} {zoom} makeDefault position={[10, 20, 20]} />
	<T.DirectionalLight intensity={0.4} />
	<T.PointLight castShadow position.y={14} intensity={1} />
	<T.Group rotation.y={$cameraY} position.y={-4}>
		<Orb />
		<Floor />
	</T.Group>
	<Effects />
</Canvas>
