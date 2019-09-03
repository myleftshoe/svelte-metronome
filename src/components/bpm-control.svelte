<style>
	div {
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
		if (value >= 40 && value <= 360)
			bpm = value;
	}
</script>
<div>
    <Ripple on:click={() => setBpm(bpm+20)}></Ripple>
    <Ripple on:click={() => setBpm(bpm+5)}></Ripple>
    <Ripple on:click={() => setBpm(bpm+1)}></Ripple>
    <Ripple on:click={() => setBpm(bpm-1)}></Ripple>
    <Ripple on:click={() => setBpm(bpm-5)}></Ripple>
    <Ripple on:click={() => setBpm(bpm-20)}></Ripple>
</div>