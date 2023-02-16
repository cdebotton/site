<script lang="ts">
	import { useThrelte, T, InstancedMesh, useFrame, Three } from '@threlte/core';
	import { Edges, useGltf } from '@threlte/extras';
	import { damp } from 'maath/easing';
	import {
		BlendFunction,
		EffectComposer,
		RenderPass,
		NormalPass,
		EffectPass,
		SSAOEffect
	} from 'postprocessing';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { writable } from 'svelte/store';
	import {
		Color,
		ColorManagement,
		HalfFloatType,
		MeshBasicMaterial,
		OrthographicCamera,
		SphereGeometry,
		Vector2
	} from 'three';
	import { isWebGL2Available } from 'three-stdlib';

	import Cross from './Cross.svelte';
	import Moon from './Moon.svelte';
	import { MeshTransmissionMaterial } from './TransmissionMaterial';
	import { colors } from './colors';

	const MOON_COUNT = 750;
	const GRID_SIZE = 50;
	const GRID_GAP = 2;
	const ORBIT_RADIUS = 8;

	let ctx = useThrelte();
	let { renderer, invalidate, size, camera } = ctx;

	let hasGL2 = isWebGL2Available();

	ColorManagement.legacyMode = false;

	let composer = new EffectComposer(renderer, {
		multisampling: hasGL2 ? 8 : 0,
		frameBufferType: HalfFloatType
	});
	ctx.composer?.dispose();
	// Blast away the types.
	ctx.composer = composer as any;
	let { scene } = ctx;

	$: if (renderer && $camera) {
		composer.removeAllPasses();
		let renderPass = new RenderPass(scene, $camera);
		let normalPass = new NormalPass(scene, $camera);
		composer.addPass(renderPass);
		composer.addPass(normalPass);

		// eslint-disable-next-line
		// @ts-ignore
		let ssaoPass = new SSAOEffect($camera, normalPass.texture, {
			blendFunction: BlendFunction.MULTIPLY,
			samples: 5,
			radius: 0.15,
			rings: 4,
			intensity: 30,
			distanceThreshold: 1.0,
			distanceFalloff: 0.0,
			rangeThreshold: 0.5,
			rangeFalloff: 0.1,
			luminanceInfluence: 0.6,
			color: new Color('red'),
			// eslint-disable-next-line
			// @ts-ignore
			bias: 0.5,
			resolutionScale: 1,
			depthAwareUpsampling: true
		});

		let effectPass = new EffectPass($camera, ssaoPass);
		composer.addPass(effectPass);

		composer.render();
	}

	// Set colors to theme
	$: if (renderer) {
		renderer.setClearColor($colors.surface);
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
			speed,
			delay: distance * 200 + 1000
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
		<T.BoxGeometry args={[4, 4, 4]} />
		<!-- <T.MeshToonMaterial color={$colors.fg} /> -->
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
		<T.MeshToonMaterial color={$colors.fg} />
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
