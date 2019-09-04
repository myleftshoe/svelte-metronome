<style>
	div {
		grid-column: 2;
		grid-row: 2;
    }
</style>
<script>
	export let playing = false;
	export let show = false;
	import Hotspot from './hotspot.svelte';
</script>
<div>
    <Hotspot {show} on:click={() => playing = !playing}>MUTE</Hotspot>
</div>
