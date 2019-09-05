<style>
	.left {
		grid-column: 1;
		grid-row: 3/4;
		display:flex;
		flex-direction: column;
		align-items:flex-start;
		justify-content: space-evenly;
	}
	.right {
		grid-column: 3;
		grid-row: 3/4;
		display:flex;
		flex-direction: column;
		align-items:flex-end;
		justify-content: space-evenly;
	}
</style>
<script>
	export let bpm = 200;
	import SideButton from './side-button';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	function change (value) {
		dispatch('change', value);
	}
</script>
<div class='left' >
	<SideButton on:click={() => change(bpm - 20) }/>
	<SideButton on:click={() => change(bpm - 1) }/>
</div>
<div class='right'>
	<SideButton right on:click={() => change(bpm + 20) }/>
	<SideButton right on:click={() => change(bpm + 1) }/>
</div>
