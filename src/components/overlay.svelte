<style>
	div {
		grid-column: 2;
		grid-row: 4;
    }
</style>
<script>
	export let show = false;
	import Hotspot from './hotspot.svelte';
</script>
<div>
    <Hotspot {show} on:click={() => show = !show}>DISMISS</Hotspot>
</div>
