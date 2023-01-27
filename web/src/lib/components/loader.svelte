<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { blur } from 'svelte/transition';

	let dots = 1;
	setInterval(() => {
		if (dots > 3) {
			dots = 0;
		} else {
			dots += 1;
		}
	}, 500);
</script>

<div class="container">
	<div transition:blur={{ duration: 20 }} class="loader">
		<div class="ripple" />
		<div class="ripple second" />
	</div>
</div>

<style>
	.container {
		position: fixed;
		inset: var(--space-0);
		display: grid;
		place-content: center;
	}

	.loader {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}

	.ripple {
		position: absolute;
		border: 4px solid var(--color-emphasis);
		opacity: 1;
		border-radius: 50%;
		animation: loader 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
	}

	.ripple.second {
		animation-delay: -0.5s;
	}

	@keyframes loader {
		0% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		4.9% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 0;
		}
		5% {
			top: 36px;
			left: 36px;
			width: 0;
			height: 0;
			opacity: 1;
		}
		100% {
			top: 0px;
			left: 0px;
			width: 72px;
			height: 72px;
			opacity: 0;
		}
	}
</style>
