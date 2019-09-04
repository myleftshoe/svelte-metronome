<style>
    .bar {
        position: relative;
        background-color: #0ff;
        height:2vh;
        width:3px;
        border-radius: 1px;
        margin:0 1vh;
        flex-shrink:0;
        cursor:pointer;
        transition: transform .2s; 
    }
    /* increase hit test area */
    .bar:after {
        content:'';
        position:absolute;
        top:-10px; bottom:-10px; 
        left:-1vh; right:-1vh; 
    }
    .bar:hover {
        background-color: #fff;
    }
    .big {
        transform: scaleY(2);
    }
    .active {
        background-color: #fff;
        box-shadow: 0px 0px 8px 6px #0ff4
    }
    @media only screen and (max-width: 600px), (max-height: 600px) { 
        .bar {
            width:2px;
        }
    }
</style>
<script>
    export let id;
    export let big=false;
    export let active=false;
    import {fade} from 'svelte/transition'; 
</script>
<div id={`bar-${id}`} class=bar class:big class:active transition:fade on:click></div>
