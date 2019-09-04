<style>
	.left {
		grid-column: 1;
		grid-row: 4;
	}
	.right {
		grid-column: 3;
		grid-row: 4;
	}
</style>
<script>
	export let clicks = 0;
	export let show = false;
	import Hotspot from './hotspot.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function setClicks (value) {
		clicks = value < 0 ? 0 : value > 9 ? 9 : value;
		dispatch('click', clicks);
	}
</script>
<div class='left'>
    <Hotspot {show} on:click={() => setClicks(clicks-1)}>CLICKS<p/>-1</Hotspot>
</div>
<div class='right'>
    <Hotspot {show} on:click={() => setClicks(clicks+1)}>CLICKS<p/>+1</Hotspot>
</div>
