<style>
    .fullscreen-underlay {
        position:absolute;
        top:0;
        left:0;
        width:100vw;
        height:100vh;
        z-index:-1;
        /* background-color: #f003; */
    }
    .bar {
        position:absolute;
        left:0;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color: #000;
        z-index:10;
        height:10vh;
    }
    #top {
        top:0;
    }   
    #bottom {
        bottom:0;
    }   
</style>
<script>
    import { slide } from 'svelte/transition';
    export let visible = false;
</script>
<div class=fullscreen-underlay on:click={() => visible = !visible}/>
{#if visible}
    <div id=top class=bar transition:slide>
        <slot name=bpm/>
    </div>
    <div id=bottom class=bar transition:slide>
        <slot name=clicks/>
    </div>
{/if}
