<script lang="ts">
	import { T } from '@threlte/core';
	import { useFrame, useThrelte } from '@threlte/core';
	import { damp } from 'maath/easing';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { Vector2 } from 'three';

	import type { OrthographicCamera } from 'three';
	import type { Object3D } from 'three';

	let { size, camera } = useThrelte();

	// Track pointer
	let pointer = writable(new Vector2());

	onMount(() => {
		function handler(event: PointerEvent) {
			pointer.update((vec) => {
				let x = (event.clientX - $size.width / 2) / ($size.width / 2);
				let y = (event.clientY - $size.height / 2) / ($size.height / 2);

				vec.setX(x);
				vec.setY(y);

				return vec;
			});
		}

		document.body.addEventListener('pointermove', handler);

		return () => {
			document.body.removeEventListener('pointermove', handler);
		};
	});

	function isOrthographicCamera(camera?: Object3D): camera is OrthographicCamera {
		return camera?.type === 'OrthographicCamera';
	}

	// Setup camera
	$: if (isOrthographicCamera($camera)) {
		$camera.zoom = Math.min(65 * ($size.width / 800), 65);
		$camera.updateProjectionMatrix();
	}

	useFrame((_, delta) => {
		damp($camera.position, 'x', Math.sin($pointer.x) * 20, 0.25, delta);
		$camera.lookAt(0, 0, 0);
	});
</script>

<T.OrthographicCamera makeDefault position={[10, 20, 20]} far={100} />
