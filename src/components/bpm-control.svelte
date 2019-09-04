<style>
	.left {
		grid-column: 1;
		grid-row: 2/4;
		display:flex;
		flex-direction: column;
	}
	.right {
		grid-column: 3;
		grid-row: 2/4;
		display:flex;
		flex-direction: column;
	}
</style>
<script>
    export let bpm = 180;
    import Ripple from './ripple.svelte';
	function setBpm (value) {
		bpm = value < 40 ? 40 : value > 360 ? 360 : value;
	}
</script>
<div class='left'>
    <Ripple on:click={() => setBpm(bpm-20)}></Ripple>
    <Ripple on:click={() => setBpm(bpm-5)}></Ripple>
    <Ripple on:click={() => setBpm(bpm-1)}></Ripple>
</div>
<div class='right'>
    <Ripple on:click={() => setBpm(bpm+20)}></Ripple>
    <Ripple on:click={() => setBpm(bpm+5)}></Ripple>
    <Ripple on:click={() => setBpm(bpm+1)}></Ripple>
</div>
