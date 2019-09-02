<style>
	.container {
		display: grid;
		grid-template-rows: 25vh 1fr 25vh;
		grid-template-columns: 10vw 1fr 10vw;
		width:100vw;
		height:100vh;
		font-size: 1em;
		/* grid-gap:2vh; */

	}
	.content {
		grid-row:2 ;
		/* height:100%; */
		/* width:100%; */
		display:grid;
		/* padding: 20px 0; */
	}
</style>

<script>
	import { fade } from 'svelte/transition';
</script>

<div class='container' transition:fade={{duration:1000}}>
	<div style='grid-column:1; grid-row: 1/4'></div>
    <div class=content>
        <slot name=content/>
	</div>
	<div style='grid-column:3; grid-row: 1/4'></div>
</div>
