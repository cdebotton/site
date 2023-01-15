<script>
	import { plum, plumDark } from '@radix-ui/colors';
	import { T, useFrame, InstancedMesh } from '@threlte/core';
	import { Edges } from '@threlte/extras';
	import { cubicInOut } from 'svelte/easing';
	import { spring, tweened } from 'svelte/motion';
	import { OctahedronGeometry, SphereGeometry, MeshToonMaterial } from 'three';

	import { theme } from '$lib/theme';

	import Moon from './moon.svelte';

	$: color = $theme.darkMode ? plumDark.plum2 : plum.plum9;
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
	let material = new MeshToonMaterial();

	/**
	 * @typedef Moon
	 * @type {object}
	 * @property {number} index
	 * @property {number} scale
	 * @property {number} distance
	 * @property {number} speed
	 * @property {number} seed
	 */

	/**
	 *
	 * @param {number} count
	 */
	function* moonGenerator(count) {
		for (let i = 0; i < count; i += 1) {
			let moon = {
				index: count - i,
				scale: Math.random() * 0.378 + 0.015,
				distance: Math.random() * 5 + 1,
				speed: (i / count) * 1.2,
				seed: Math.random() * 5235928
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
	let time = 50;

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
