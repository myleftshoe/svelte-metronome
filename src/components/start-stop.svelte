<style>
	div {
		grid-column: 2;
		grid-row: 2;
    }
</style>
<script>
	export let playing = false;
	export let show = false;
	import Ripple from './ripple.svelte';
</script>
<div>
    <Ripple {show} on:click={() => playing = !playing}>MUTE</Ripple>
</div>
