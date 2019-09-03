<style>
	div {
		grid-column: 1;
		grid-row: 2/4;
		display:flex;
		flex-direction: column;
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
<div>
    <Ripple on:click={() => setClicks(clicks+1)}></Ripple>
    <Ripple on:click={() => setClicks(clicks-1)}></Ripple>
</div>