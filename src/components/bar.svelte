<style>
    .bar {
        position: relative;
        background-color: #0ff;
        opacity: 0.7;
        height:2vh;
        width:3px;
        border-radius: 1px;
        margin:0 1vh;
        flex-shrink:0;
        cursor:pointer;
        transition: transform opacity .2s; 
    }
    /* increase hit test area */
    .bar:after {
        content:'';
        position:absolute;
        top:-10px; bottom:-10px; 
        left:-1vh; right:-1vh; 
    }
    .big {
        transform: scaleY(2);
        /* height:4vh; */
    }
    .active, .bar:hover {
        opacity:1;
        /* transform:scaleY(2); */
        box-shadow: 0px 0px 8px 6px #fff4

    }
    @media only screen and (max-width: 600px), (max-height: 600px) { 
        .bar {
            width:2px;
        }
    }
</style>
<script>
    export let big=false;
    export let active=false;
    import {fade} from 'svelte/transition'; 
</script>
<div class=bar class:big class:active transition:fade on:click></div>
