<style>
	.container {
		/* background-color: pink; */
		display: grid;
		grid-template-rows: auto auto auto 1fr auto;
		width:90vw; 
		height:95vh;
		font-size: 1.5em;

	}
	.top {
		background-color: #3333;
		grid-row:1;
		display:flex;
		justify-content:space-evenly;
	}
	.top1 {
		/* background-color: #f339; */
		grid-row:2;
	}
	.top2 {
		/* background-color: #f339; */
		grid-row:3;
		display: flex;
		justify-content:space-evenly;
	}
	.middle {
		/* background-color: red; */
		grid-row:4 ;
		height:100%;
		display:grid;
	}
	.bottom {
		/* background-color: blueviolet; */
		grid-row:5 ;
		width:100%;
		display:grid;
		justify-content: center;
	}
</style>

<script>
	import { fade } from 'svelte/transition';
</script>

<div class='container' transition:fade={{duration:1000}}>
    <div class=top>
        <slot name=top/>
    </div>
    <div class=top1>
        <slot name=top1/>
    </div>
    <div class=top2>
        <slot name=top2/>
    </div>
    <div class=middle>
        <slot name=middle/>
	</div>
    <div class=bottom>
        <slot name=bottom/>
    </div>
</div>
