<script lang="ts">
	import { useThrelte, T } from '@threlte/core';
	import { Color } from 'three';

	import Camera from './Camera.svelte';
	import Cluster from './Cluster.svelte';
	import Effects from './Effects.svelte';
	import Floor from './Floor.svelte';
	import Moons from './Moons.svelte';
	import Planet from './Planet.svelte';
	import { colors } from './colors';

	let { scene } = useThrelte();

	$: scene.background = new Color($colors.surface);
</script>

<Camera />
<T.DirectionalLight intensity={0.4} />
<T.PointLight castShadow intensity={0.8} position={[-4, 10, 0]} />
<T.Fog attach="fog" color={$colors.surface} near={31} far={36} />
<Cluster>
	<Planet />
	<Moons moonCount={1000} orbitRadius={8} />
</Cluster>
<Floor />
<Effects />
