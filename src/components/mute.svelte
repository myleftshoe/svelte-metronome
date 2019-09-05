<style>
	div {
		grid-column:2;
		grid-row:2/3;
		align-self:start;
		justify-self:center;
		background-color:#181818;
		background-color:#002020;
		border-radius:5px;
		height:50%;
		height:auto;
		width:80vw;
		box-shadow: 
			0 0 3px 0px #fff2,
			0px 1px 3px 6px #000a inset
			/* -1px -1px 3px 6px #0007 inset */
			
			/* 1px 1px 3px 0px #0ff3 inset */
	}
</style>
<script>
	export let pattern = [];
	let pressed = false;
	import { createEventDispatcher } from 'svelte';
	import BeatsControl from './topbar'
	const dispatch = createEventDispatcher();
	function handleClick (value) {
		dispatch('click', value);
	}
</script>
<div
	class:pressed 
	on:pointerdown={() => pressed = true} 
	on:pointerup={() => pressed = false}
	on:click={() => handleClick(20)}
>
	<BeatsControl bind:pattern></BeatsControl>
</div>
