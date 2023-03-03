<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { PCFSoftShadowMap, ColorManagement } from 'three';

	import Scene from './Scene.svelte';

	// @ts-expect-error @types/three hasn't been updated.
	// ColorManagement.legacyMode = false -> ColorManagement.enabled = true
	ColorManagement.enabled = true;
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
