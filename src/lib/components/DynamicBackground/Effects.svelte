<script lang="ts">
	import { useThrelte } from '@threlte/core';
	import {
		BlendFunction,
		EffectComposer,
		RenderPass,
		NormalPass,
		EffectPass,
		SSAOEffect,
		DepthDownsamplingPass,
		SMAAEffect,
		SMAAPreset
	} from 'postprocessing';
	import { Color } from 'three';
	import { HalfFloatType } from 'three';

	import { colors } from './colors';

	let ctx = useThrelte();
	let { renderer, camera } = ctx;

	$: if (renderer && $camera) {
		let composer = new EffectComposer(renderer, {
			multisampling: renderer.capabilities.isWebGL2 ? 8 : 0,
			frameBufferType: HalfFloatType
		});

		ctx.composer?.dispose();
		// Blast away the types.
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		ctx.composer = composer as any;
		let { scene } = ctx;
		composer.removeAllPasses();
		let renderPass = new RenderPass(scene, $camera);
		let normalPass = new NormalPass(scene, $camera);
		composer.addPass(renderPass);
		composer.addPass(normalPass);

		let downsamplePass: DepthDownsamplingPass | undefined;

		if (renderer.capabilities.isWebGL2) {
			downsamplePass = new DepthDownsamplingPass({
				normalBuffer: normalPass.texture,
				resolutionScale: 0.5
			});
			composer.addPass(downsamplePass);
		}

		let ssaoEffect = new SSAOEffect($camera, normalPass.texture, {
			blendFunction: BlendFunction.MULTIPLY,
			samples: 32,
			radius: 0.15,
			rings: 4,
			intensity: 20,
			distanceThreshold: 1.0,
			distanceFalloff: 0.0,
			rangeThreshold: 0.5,
			rangeFalloff: 0.1,
			luminanceInfluence: 0.16,
			color: new Color($colors.accent),
			bias: 0.5,
			normalDepthBuffer: downsamplePass?.texture,
			resolutionScale: 0.5,
			depthAwareUpsampling: true,
			worldDistanceThreshold: 31,
			worldDistanceFalloff: 5,
			worldProximityThreshold: 25,
			worldProximityFalloff: 0.25
		});

		let smaaEffect = new SMAAEffect({ preset: SMAAPreset.ULTRA });

		let effectPass = new EffectPass($camera, ssaoEffect, smaaEffect);

		composer.addPass(effectPass);

		composer.render();
	}
</script>
