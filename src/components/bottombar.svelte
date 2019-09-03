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
    @keyframes ripple {
        0% {
            opacity: 0.3;
            transform: scale(1);
        }

        50% {
            transform: scale(8);
        }

        100% {
            opacity: 0;
        }
    }
    .ripple-container {
        position:relative;
        height:100%;
        width:100%;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        height: 50px;
        width: 50px;
        background: white;
        border-radius: 50%;
        opacity: 0.3;
        animation-name: ripple;
        /* animation-delay:5s; */
        animation-duration: 200ms;
        animation-iteration-count: 1;
        animation-timing-function: ease;
    }
</style>
<script>
    export let visible = false;
    import { slide } from 'svelte/transition';
    let ripple = false;
    let style='';
    function doRipple(e) {
        console.log(e.target.getBoundingClientRect());
        console.log(e);
        style=`left: ${e.offsetX - 25}px; top: ${e.offsetY - 25}px;`
        ripple = true;
        e.target.addEventListener('animationend', () => {ripple = false;})
    }
    $: {console.log(style)}
</script>
{#if visible}
    <div class=container transition:slide>
        <div class=ripple-container on:click={doRipple}>
            <div class:ripple {style} on:click/>
        </div>
        <slot name=content/>
        <div class=ripple-container>
            <div class=hotspot on:click/>
        </div>
    </div>
{/if}
