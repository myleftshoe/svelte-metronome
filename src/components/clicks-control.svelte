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
    import Ripple from './ripple.svelte';
	function setClicks (value) {
		if (value >= 0 && value <= 9)
			clicks = value;
	}
</script>
<div class='left'>
    <Ripple on:click={() => setClicks(clicks-1)}></Ripple>
</div>
<div class='right'>
    <Ripple on:click={() => setClicks(clicks+1)}></Ripple>
</div>
