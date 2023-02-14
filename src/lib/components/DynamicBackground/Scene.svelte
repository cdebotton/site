<script lang="ts">
	import { useThrelte, T, InstancedMesh, useFrame } from '@threlte/core';
	import { Edges, useGltf } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import {
		ColorManagement,
		MeshBasicMaterial,
		OrthographicCamera,
		SphereGeometry,
		Vector2
	} from 'three';
	import { colors } from './colors';
	import Cross from './Cross.svelte';
	import Moon from './Moon.svelte';
	import { damp } from 'maath/easing';
	import { writable } from 'svelte/store';

	const MOON_COUNT = 750;
	const GRID_SIZE = 100;
	const GRID_GAP = 2;
	const ORBIT_RADIUS = 8;

	let { renderer, invalidate, size, camera } = useThrelte();

	ColorManagement.legacyMode = false;

	// Set colors to theme
	$: {
		renderer?.setClearColor($colors.surface);
		invalidate();
	}

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

	// Setup camera
	$: if ($camera && $camera instanceof OrthographicCamera) {
		$camera.zoom = Math.min(65 * ($size.width / 800), 65);
		$camera.updateProjectionMatrix();
	}

	useFrame((_, delta) => {
		damp($camera.position, 'x', Math.sin($pointer.x) * 20, 0.25, delta);
		$camera.lookAt(0, 0, 0);
	});

	// Setup floor
	let { gltf: crossGltf } = useGltf('/assets/glb/cross.glb');
	const EDGE_NODES = GRID_SIZE / GRID_GAP + 1;
	let crossData = Array.from({ length: EDGE_NODES }, (_, z) => {
		return Array.from({ length: EDGE_NODES }, (_, x) => {
			let key = z * EDGE_NODES + x;
			return {
				key,
				x: x * GRID_GAP - GRID_SIZE / 2,
				z: z * GRID_GAP - GRID_SIZE / 2,
				delay:
					Math.sqrt(Math.pow(x - EDGE_NODES / 2, 2) + Math.pow(Math.abs(z - EDGE_NODES / 2), 2)) *
					100
			};
		});
	}).flat();

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

	// Setup moons
	let moonData = Array.from({ length: MOON_COUNT }, (_, i) => {
		let distance = Math.random() * ORBIT_RADIUS;
		let speed = (distance + 2) * (1 / 10);
		return {
			key: i,
			scale: Math.random() * 0.5 + 0.05,
			seed: Math.random() * 51421,
			distance: distance + 4,
			y: Math.sin(i),
			speed
		};
	});

	// Setup solar bounce
	let bounceY = 0;
	useFrame(({ clock }) => {
		let t = clock.getElapsedTime();
		bounceY = Math.sin(t) * 2 + 1;
	});
</script>

<!-- Camera -->
<T.OrthographicCamera makeDefault position={[10, 20, 20]} />

<!-- Lights -->
<T.DirectionalLight intensity={0.4} />
<T.PointLight castShadow intensity={0.8} position={[-4, 10, 0]} />

<!-- Fog -->
<T.Fog attach="fog" color={$colors.surface} near={24} far={37} />

<!-- Bounce -->
<T.Group position.y={bounceY}>
	<!-- Planet -->
	<T.Mesh castShadow scale={$planetScale} rotation={[planetRotationX, 0, planetRotationZ]}>
		<T.OctahedronGeometry args={[3, 3]} />
		<T.MeshToonMaterial color={$colors.fg} />
		<Edges color={$colors.accent} />
	</T.Mesh>

	<!-- Moons -->
	<InstancedMesh castShadow geometry={new SphereGeometry()} material={new MeshBasicMaterial()}>
		{#each moonData as { key, ...moon } (key)}
			<Moon {...moon} />
		{/each}
	</InstancedMesh>
</T.Group>

<!-- Floor -->
<T.Group position.y={-4}>
	<T.Mesh receiveShadow rotation.x={Math.PI / -2}>
		<T.PlaneGeometry args={[100, 100]} />
		<T.ShadowMaterial color={0x000000} opacity={0.2} />
	</T.Mesh>
	<T.GridHelper args={[GRID_SIZE, GRID_SIZE, $colors.surfaceSubtle, $colors.surfaceSubtle]} />
	{#if $crossGltf}
		<InstancedMesh geometry={$crossGltf.nodes['Cross'].geometry} material={new MeshBasicMaterial()}>
			{#each crossData as { key, ...cross } (key)}
				<Cross {...cross} />
			{/each}
		</InstancedMesh>
	{/if}
</T.Group>
