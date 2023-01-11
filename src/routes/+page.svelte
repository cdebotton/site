<script>
	let sceneLoader = import('./scene.svelte');
</script>

<div>
	{#await sceneLoader then { default: Scene }}
		<Scene />
	{/await}
</div>

<style>
	div {
		position: fixed;
		inset: 0;
	}
</style>
