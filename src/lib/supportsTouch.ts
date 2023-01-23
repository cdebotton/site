import { browser } from '$app/environment';

export function supportsTouch() {
	if (browser && matchMedia('not all and (hover: none)').matches) {
		return false;
	}

	return true;
}
