<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';

	let { renderer } = useThrelte();

	$: canvas = renderer?.domElement;

	let href: string | undefined = undefined;
	let favicon: HTMLCanvasElement;
	let lowPerf = false;

	onMount(() => {
		let ctx = favicon.getContext('2d');
		let timer: NodeJS.Timeout | null = null;

		function createFaviconFromCanvas() {
			setTimeout(() => {
				if (canvas && ctx && !lowPerf) {
					let edge = 100;
					let [cx, cy] = [canvas.width / 2, canvas.height / 2];
					ctx.drawImage(
						canvas,
						cx - edge,
						cy - edge,
						edge * 2,
						edge * 2,
						0,
						0,
						favicon.width,
						favicon.height
					);
					href = favicon.toDataURL('image/x-icon');
					ctx.clearRect(0, 0, favicon.width, favicon.height);
				}
			}, 1000);
			timer = setTimeout(() => createFaviconFromCanvas(), 1000);
		}

		createFaviconFromCanvas();

		return () => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = null;
		};
	});
</script>

<canvas style:display="none" width={32} height={32} bind:this={favicon} />
<svelte:head>
	<link rel="icon" type="image/x-icon" {href} />
</svelte:head>
