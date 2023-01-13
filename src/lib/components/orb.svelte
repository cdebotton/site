<script>
	import { plum, plumDark } from '@radix-ui/colors';
	import { T, useFrame, InstancedMesh } from '@threlte/core';
	import { Edges } from '@threlte/extras';
	import { cubicInOut } from 'svelte/easing';
	import { spring, tweened } from 'svelte/motion';
	import {
		OctahedronGeometry,
		SphereGeometry,
		MeshToonMaterial,
		MeshStandardMaterial
	} from 'three';

	import Moon from './moon.svelte';

	import { theme } from '$lib/theme';

	$: color = $theme.darkMode ? plumDark.plum2 : plum.plum8;
	$: edgeColor = $theme.darkMode ? plumDark.plum10 : plum.plum11;

	const MIN_Y = 4;
	const MAX_Y = 6;

	let rotationY = 0;
	let rotationZ = 0;
	let scale = spring(0, { damping: 0.05, stiffness: 0.005 });
	let y = tweened(MIN_Y, {
		duration: 5000,
		easing: cubicInOut
	});

	useFrame(({ clock }) => {
		rotationY = Math.sin(clock.getElapsedTime());
		rotationZ = Math.cos(clock.getElapsedTime());
	});

	setTimeout(() => {
		$scale = 3;
	}, 750);

	function drift() {
		y.update((value) => (value === MIN_Y ? MAX_Y : MIN_Y)).then(() => drift());
	}

	drift();

	let geometry = new SphereGeometry();
	let material = new MeshStandardMaterial({ metalness: 1, roughness: 10 });

	/**
	 * @typedef Moon
	 * @type {object}
	 * @property {number} index
	 * @property {number} scale
	 * @property {number} distance
	 */

	/**
	 *
	 * @param {number} count
	 */
	function* moonGenerator(count) {
		for (let i = 0; i < count; i += 1) {
			let moon = {
				index: count - i,
				scale: Math.random() * 0.175 + 0.1,
				distance: Math.random() * 4
			};

			yield moon;
		}
	}

	/**
	 *
	 * @param {number} amount
	 * @returns {Promise<void>}
	 */
	async function delay(amount) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, amount);
		});
	}

	/** @type {Moon[]} */
	let moons = [];
	let time = 250;

	(async () => {
		for (let moon of moonGenerator(500)) {
			moons.push(moon);
			await delay(time);
			moons = moons;
			time *= 0.99;
		}
	})();
</script>

<T.Group position.y={$y}>
	<InstancedMesh castShadow {geometry} {material}>
		{#each moons as moon (moon.index)}
			<Moon {...moon} />
		{/each}
	</InstancedMesh>

	<T.Mesh
		castShadow
		geometry={new OctahedronGeometry(1, 2)}
		material={new MeshToonMaterial({ color, transparent: true, opacity: 0.85 })}
		scale={$scale}
		rotation.y={rotationY}
		rotation.z={rotationZ}
	>
		<Edges color={edgeColor} />
	</T.Mesh>
</T.Group>
