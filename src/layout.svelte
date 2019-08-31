<style>
	.container {
		display: grid;
		grid-template-rows: 0vh auto auto 2vh 1fr 70px;
		width:80vw;
		height:95vh;
		font-size: 1em;
		grid-gap:2vh;

	}
	.top {
		background-color: #3333;
		grid-row:1;
		display:flex;
		justify-content:space-evenly;
	}
	.top1 {
		grid-row:2;
	}
	.top2 {
		grid-row:3;
		display: flex;
		justify-content:space-between;
	}
	.spacer { 
		grid-row:4;
	 }
	.middle {
		grid-row:5 ;
		/* height:100%; */
		/* width:100%; */
		display:grid;
		/* padding: 20px 0; */
	}
	.bottom {
		/* background-color: blueviolet; */
		grid-row:6 ;
		/* width:100%; */
		display:grid;
		justify-content: center;
		align-content: end;	
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
