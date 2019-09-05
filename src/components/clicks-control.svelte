<style>
	.left {
		grid-column: 1;
		grid-row: 4/6;
		justify-self:start;
		align-self:center;
	}
	.right {
		grid-column: 3;
		grid-row: 4/6;
		justify-self:end;
		align-self:center;
	}
</style>
<script>
	export let clicks = 0;
	import SideButton from './side-button';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function setClicks (value) {
		clicks = value < 0 ? 0 : value > 9 ? 9 : value;
		dispatch('click', clicks);
	}
</script>
<div class='left'>
	<SideButton on:click={() => setClicks(clicks-1)}/>
</div>
<div class='right'>
	<SideButton right on:click={() => setClicks(clicks+1)}/>
</div>
