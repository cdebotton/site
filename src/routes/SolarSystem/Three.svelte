<script lang="ts">
	import * as THREE from 'three';

	import { browser } from '$app/environment';

	let innerWidth = 0;
	let innerHeight = 0;

	let canvas: HTMLCanvasElement | undefined = undefined;

	let renderer: THREE.WebGLRenderer;
	let scene = new THREE.Scene();
	let camera = new THREE.PerspectiveCamera();
	camera.zoom = 3;

	camera.position.set(10, 20, 20);
	camera.lookAt(0, 0, 0);

	let mesh = new THREE.Mesh(new THREE.OctahedronGeometry(3, 2), new THREE.MeshToonMaterial());
	mesh.position.set(0, 0, 0);

	let directionalLight = new THREE.DirectionalLight();
	directionalLight.intensity = 0.4;

	let pointLight = new THREE.PointLight();
	pointLight.intensity = 0.4;
	pointLight.position.set(-2, 4, 4);

	let floor = new THREE.Group();
	let grid = new THREE.GridHelper(100, 100);
	floor.add(grid);

	scene.add(floor);

	scene.add(directionalLight);
	scene.add(pointLight);
	scene.add(mesh);

	let clock = new THREE.Clock();
	let lastTime = 0;

	function updateScene(delta: number) {
		let time = clock.getElapsedTime();
		mesh.rotation.x = Math.sin(time);
		mesh.rotation.z = Math.cos(time);
	}

	function render() {
		let t = clock.getElapsedTime() * 1000;
		updateScene(t - lastTime);
		renderer?.render(scene, camera);
		requestAnimationFrame(render);
		lastTime = t;
	}

	$: {
		camera.aspect = innerWidth / innerHeight;
		camera.updateProjectionMatrix();
		renderer?.setSize(innerWidth, innerHeight);
		renderer?.setPixelRatio(window.devicePixelRatio);
	}

	$: if (browser) {
		renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
		render();
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<canvas bind:this={canvas} />

<style>
	canvas {
		position: fixed;
		inset: 0;
	}
</style>
