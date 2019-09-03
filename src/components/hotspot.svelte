<style>
    div {
        height:100%;
        width:100%;
    }
</style>
<script>
    export let ripple = false;
    import Ripple from './ripple.svelte';
</script>
<div class=container on:click>
    {#if ripple}
        <Ripple/>
    {/if}
</div>
