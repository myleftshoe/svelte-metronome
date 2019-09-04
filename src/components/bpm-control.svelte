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
	export let show = false;
    import Hotspot from './hotspot.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function setBpm (value) {
		bpm = value < 40 ? 40 : value > 360 ? 360 : value;
		dispatch('click', bpm);
	}
</script>
<div class='left'>
    <Hotspot {show} on:click={() => setBpm(bpm-20)}>BPM<p/>-20</Hotspot>
    <Hotspot {show} on:click={() => setBpm(bpm-5)}>-5</Hotspot>
    <Hotspot {show} on:click={() => setBpm(bpm-1)}>-1</Hotspot>
</div>
<div class='right'>
    <Hotspot {show} on:click={() => setBpm(bpm+20)}>BPM<p/>+20</Hotspot>
    <Hotspot {show} on:click={() => setBpm(bpm+5)}>+5</Hotspot>
    <Hotspot {show} on:click={() => setBpm(bpm+1)}>+1</Hotspot>
</div>
