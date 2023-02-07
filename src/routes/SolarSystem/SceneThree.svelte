<script lang="ts">
	import { indigoDark, plumDark, red } from '@radix-ui/colors';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import * as THREE from 'three';
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

	let draco = new DRACOLoader();
	let loader = new GLTFLoader();
	draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
	draco.setDecoderConfig({ type: 'js' });
	loader.setDRACOLoader(draco);

	import { theme } from '$lib/theme';

	let domElement: HTMLCanvasElement;
	let renderer: THREE.WebGLRenderer | undefined;
	let clientWidth = 0;
	let clientHeight = 0;

	let clock = new THREE.Clock();
	let scene = new THREE.Scene();
	let camera = new THREE.PerspectiveCamera(60);

	let moonData = Array.from({ length: 750 }, (_, i) => {
		let distance = Math.random() * 8 + 4;
		return {
			distance,
			scale: Math.random() * 0.378 + 0.015,
			speed: (distance / 8) * 1.2,
			seed: Math.random() * 5235928
		};
	});

	let planet = new THREE.Mesh(
		new THREE.OctahedronGeometry(3, 4),
		new THREE.MeshToonMaterial({ color: 'white' })
	);

	planet.material.opacity = 0.85;
	planet.material.transparent = true;

	let edges = new THREE.EdgesGeometry(planet.geometry);
	let lines = new THREE.LineSegments(edges, new THREE.MeshBasicMaterial({ color: 'red' }));
	let light = new THREE.AmbientLight();
	let group = new THREE.Group();
	let moons = new THREE.InstancedMesh(
		new THREE.SphereGeometry(),
		new THREE.MeshBasicMaterial(),
		moonData.length
	);
	let fog = new THREE.Fog('black', 23, 37);

	scene.fog = fog;

	let floorGroup = new THREE.Group();
	let gridHelper = new THREE.GridHelper(100, 100);
	let crossData = Array.from({ length: 50 }, (_, y) => {
		return Array.from({ length: 50 }, (_, x) => {
			return {
				x,
				y
			};
		});
	}).flat();
	let crosses = new THREE.InstancedMesh(undefined, undefined, crossData.length);

	floorGroup.position.y = -4;
	floorGroup.add(gridHelper);
	floorGroup.add(crosses);
	scene.add(floorGroup);

	let crossScale: THREE.Vector3;
	loader.load('/assets/glb/cross-transformed.glb', (gltf) => {
		let [root] = gltf.scene.children;
		if (root instanceof THREE.Mesh) {
			crossScale = root.scale;
			crosses.geometry = root.geometry;
		}
	});

	group.add(lines);
	group.add(planet);
	scene.add(moons);

	let scale = spring(0, { damping: 0.035, stiffness: 0.005, precision: 0.001 });
	scale.set(1);

	$: group.scale.setScalar($scale);

	$: {
		planet.material.color = new THREE.Color($theme.mode === 'EVA-02' ? red.red9 : plumDark.plum2);
		lines.material.color = new THREE.Color($theme.mode === 'EVA-02' ? red.red11 : plumDark.plum10);
		moons.material.color = new THREE.Color($theme.mode === 'EVA-02' ? red.red8 : plumDark.plum3);
		fog.color = new THREE.Color($theme.mode === 'EVA-02' ? red.red1 : indigoDark.indigo1);
	}

	scene.add(group);
	scene.add(light);

	let dummyObject = new THREE.Object3D();
	let dummyCross = new THREE.Object3D();

	function render() {
		let t = clock.getElapsedTime();
		renderer?.render(scene, camera);

		crossData.forEach((cross, i) => {
			let { x, y } = cross;

			dummyCross.position.set(x * 2 - 50, 0, y * 2 - 50);
			if (crossScale) {
				dummyCross.scale.set(crossScale.x / 2, crossScale.y, crossScale.z / 2);
			}
			dummyCross.updateMatrix();
			crosses.setMatrixAt(i, dummyCross.matrix);
		});

		crosses.instanceMatrix.needsUpdate = true;

		for (let i = 0; i < 750; i += 1) {
			let { speed, scale, distance, seed } = moonData[i];
			let t1 = t * speed + seed;
			dummyObject.updateMatrix();
			dummyObject.position.set(Math.sin(t1) * distance, Math.cos(t1) * 5, Math.cos(t1) * distance);
			dummyObject.scale.setScalar(scale);
			moons.setMatrixAt(i, dummyObject.matrix);
		}

		moons.instanceMatrix.needsUpdate = true;

		group.rotation.x = Math.sin(clock.getElapsedTime());
		group.rotation.z = Math.cos(clock.getElapsedTime());

		requestAnimationFrame(render);
	}

	$: {
		renderer?.setSize(clientWidth, clientHeight);
		renderer?.setPixelRatio(window.devicePixelRatio);
		camera.aspect = clientWidth / clientHeight;
		camera.updateProjectionMatrix();
	}

	onMount(() => {
		camera.position.set(10, 20, 20);
		camera.zoom = 1.5;
		camera.lookAt(0, 0, 0);

		renderer = new THREE.WebGLRenderer({ canvas: domElement, alpha: true, antialias: false });

		render();
	});
</script>

<div bind:clientWidth bind:clientHeight>
	<canvas bind:this={domElement} />
</div>

<style>
	div {
		position: absolute;
		inset: 0;
	}
</style>
