<style>
	.container {
		display: flex;
		flex-direction: column;
		height:100%;
		width:calc(100% - 10vw);
		justify-content: space-around;
		/* background-color: rgba(256,0,0,.08); */
	}
	.play {
		align-self: center
	}
	@media only screen and (max-height: 530px) and (orientation: landscape) {
		.container {
			/* background-color: pink; */
			display: grid;
			grid-template-columns: 20% 20% 15% 1fr 2vw;
			grid-template-rows: 2vw 1fr auto auto 2vh;
			width:100%;
		}
		.bpm-control {
			/* background-color: coral; */
			grid-column:1 / 3;
			grid-row:1 / 5;
			align-self:center;
		}
		.play {
			/* background-color: brown; */
			grid-column:3/5;
			grid-row:2/3;
			justify-self:center;
			align-self: center;
		}
		.clicks {
			/* background-color: chartreuse; */
			grid-column:3/5;
			grid-row:1/2;
			align-self:center;
			justify-self:end;
		}
		.beats-control {
			/* background-color: aqua; */
			grid-column: 3 / 5;
			grid-row: 4/5;
			align-self:center;
		}
		.beat-buttons {
			/* background-color: #f002; */
			grid-column: 4 / 5;
			grid-row: 3/4;
		}

	}
</style>

<script>
	import { fade } from 'svelte/transition';
</script>

<div class='container' transition:fade={{duration:1000}}>
    <div class=bpm-control>
        <slot name=bpm-control/>
    </div>
    <div class=play>
        <slot name=play/>
    </div>
    <div class=beat-buttons>
        <slot name=beat-buttons/>
    </div>
    <div class=beats-control>
        <slot name=beats-control/>
    </div>
    <div class=clicks>
        <slot name=clicks/>
    </div>
</div>
