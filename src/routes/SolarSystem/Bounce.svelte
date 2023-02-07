<script lang="ts">
	import { T, useFrame } from '@threlte/core';
	import { quadInOut } from 'svelte/easing';

	let y: number;

	useFrame(({ clock }) => {
		let t = quadInOut((clock.getElapsedTime() / 8) % 1) * Math.PI;
		y = Math.sin(t) * 5 + 1;
	});
</script>

<T.Group position.y={y}>
	<slot />
</T.Group>
