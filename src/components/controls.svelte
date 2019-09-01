<style>
    .container {
        position:absolute;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        z-index:-1;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:space-between;
        /* background-color: #f003; */
    }
    .bar {
        width:100%;
        display:flex;
        justify-content:center;
        background-color: #000;
        z-index:10;
    }
</style>
<script>
    import { slide } from 'svelte/transition';
    export let visible = false;
</script>
<div class=container on:click={() => visible = !visible}>
    {#if visible}
        <div class=bar transition:slide>
            <slot/>
        </div>
        <div class=bar transition:slide>
            <slot/>
        </div>
    {/if}
</div>