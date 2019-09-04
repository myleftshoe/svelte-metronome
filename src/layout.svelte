<style>
	.container {
		display: grid;
		grid-template-rows: 10vh 1fr 40vh 1fr 10vh;
		grid-template-columns: 1fr 70vw 1fr;
		width:100vw;
		height:100vh;
		font-size: 1em;
	}
</style>

<script>
	import { fade } from 'svelte/transition';
</script>

<div class=container transition:fade={{duration:1000}}>
	<slot/>
	<slot/>
	<slot/>
	<slot/>
	<slot/>
</div>
