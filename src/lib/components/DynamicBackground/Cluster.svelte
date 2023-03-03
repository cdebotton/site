<script lang="ts">
	import { T, useFrame } from '@threlte/core';

	// Setup solar bounce
	let bounceY = 0;
	useFrame(({ clock }) => {
		let t = clock.getElapsedTime();
		bounceY = Math.sin(t) * 2 + 1;
	});
</script>

<T.Group position.y={bounceY}>
	<slot />
</T.Group>
