<style>
	.container {
		display: grid;
		grid-template-rows: 10vh 1fr 50vh 1fr 10vh;
		grid-template-columns: 10vw 1fr 10vw;
		width:100vw;
		height:100vh;
		font-size: 1em;
	}
	.content {
		grid-row:3;
		grid-column:2;
		display:grid;
		z-index:1;
	}
</style>

<script>
	import { fade } from 'svelte/transition';
</script>

<div id='layout' class=container transition:fade={{duration:1000}}>
    <div class=content>
        <slot name=content/>
	</div>
	<slot/>
	<slot/>
</div>
