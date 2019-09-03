<style>
    .container {
        position:absolute;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
		display: grid;
		grid-template-rows: 10vh 1fr 10vh;
		grid-auto-flow: row;
		grid-template-columns: 10vw 1fr 10vw;
	}
	.clicks {
		grid-column: 1;
		grid-row-start: 2;
		display:flex;
		flex-direction: column;
	}
	.bpm {
		grid-column: 3;
		grid-row-start: 2;
		display:flex;
		flex-direction: column;
	}	
</style>
<script>
	import Ripple from './ripple.svelte'
</script>
<div id='underlay' class=container>
	<!-- <div class=clicks> -->
		<slot/>
	<!-- </div>
	<div class=bpm> -->
		<slot/>
	<!-- </div> -->
</div>
