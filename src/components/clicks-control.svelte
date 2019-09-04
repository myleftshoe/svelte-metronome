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
	import Ripple from './ripple.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function setClicks (value) {
		clicks = value < 0 ? 0 : value > 9 ? 9 : value;
		dispatch('click', clicks);
	}
</script>
<div class='left'>
    <Ripple {show} on:click={() => setClicks(clicks-1)}>CLICKS<p/>-1</Ripple>
</div>
<div class='right'>
    <Ripple {show} on:click={() => setClicks(clicks+1)}>CLICKS<p/>+1</Ripple>
</div>
