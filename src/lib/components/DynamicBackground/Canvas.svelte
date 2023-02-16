<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { PCFSoftShadowMap } from 'three';

	import Scene from './Scene.svelte';
</script>

<Canvas
	shadows
	shadowMapType={PCFSoftShadowMap}
	rendererParameters={{
		antialias: false,
		alpha: false,
		stencil: false,
		depth: false,
		powerPreference: 'high-performance'
	}}
>
	<Scene />
</Canvas>
