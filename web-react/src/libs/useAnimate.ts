import { animate, type AnimationControls, type AnimationOptions } from 'motion';
import { MutableRefObject, useLayoutEffect, useRef } from 'react';

import type { Object3D } from 'three';

export function useAnimate<T extends Object3D>(
	ref: MutableRefObject<T>,
	step: (time: number, obj: T) => void,
	options?: AnimationOptions,
) {
	let handle = useRef<AnimationControls>();

	if (!handle.current) {
		handle.current = animate((t) => step(t, ref.current), options);
	}

	return handle.current;
}
