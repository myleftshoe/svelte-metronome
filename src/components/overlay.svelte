<style>
	div {
		grid-column: 2;
		grid-row: 4;
    }
</style>
<script>
	export let show = false;
	import Ripple from './ripple.svelte';
</script>
<div>
    <Ripple {show} on:click={() => show = !show}>DISMISS</Ripple>
</div>
