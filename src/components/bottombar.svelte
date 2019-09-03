<style>
    .container {
        position:fixed;
        bottom:0;
        left:0;
        background-color: #000;
        display:grid;
        grid-auto-flow: column;
        grid-template-columns: minmax(5vw, 100%) auto minmax(5vw, 100%);
        width:100%;
        height:10vh;
        align-items:center;
    }
</style>
<script>
    export let visible = false;
    import { slide } from 'svelte/transition';
    import Ripple from './ripple.svelte';
</script>
{#if visible}
    <div class=container transition:slide>
        <Ripple on:click/>
        <slot/>
        <Ripple/>
    </div>
{/if}
