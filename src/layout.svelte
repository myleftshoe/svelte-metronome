<style>
	.container {
		/* background-color: pink; */
		display: grid;
		grid-template-columns: 20% 1fr 20%;
		grid-template-rows: 20% 1fr 20%;
		width:100vw;
		height:100vh;
		align-items:center;
		justify-items:center;
	}
	.top {
		background-color: coral;
		grid-row:1;
		grid-column: 1/4;
	}
	.left {
		background-color: coral;
		grid-column:1;
		grid-row:2 ;
	}
	.right {
		background-color: coral;
		grid-column:3;
		grid-row:2 ;
	}
	.bottom {
		background-color: coral;
		grid-row:3 ;
		grid-column: 1/4;
	}
</style>

<script>
	import { fade } from 'svelte/transition';
</script>

<div class='container' transition:fade={{duration:1000}}>
    <div class=top>
        <slot name=top/>
    </div>
    <div class=left>
        <slot name=left/>
    </div>
    <div class=right>
        <slot name=right/>
    </div>
    <div class=bottom>
        <slot name=bottom/>
    </div>
</div>
