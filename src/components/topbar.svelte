<style>
    div {
        position:absolute;
        top:0;
        left:0;
        width:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        background-color: #000;
        z-index:1;
        height:10vh;
    }
</style>
<script>
    import { slide } from 'svelte/transition';
    export let visible = false;
</script>
{#if visible}
    <div transition:slide>
        <slot name=content/>
    </div>
{/if}
