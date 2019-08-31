
<script>
    export let vertical = false;
    export let responsive = false;
    export let value;
    export let min = 0;
    export let max = 10;
    export let step = 1;
    let mql = window.matchMedia('(orientation: portrait)');
    mql.addListener(e => {mql = e});

    $: vertical = responsive && mql.matches || vertical;
</script>

<div class=pure-material-slider>
    <input style={$$props.style} type='range' class:vertical bind:value orient={vertical && "vertical"} {min} {max} {step}
    class=focused
    />
</div>


<style>
    .pure-material-slider {
        --pure-material-safari-helper1: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.04);
        --pure-material-safari-helper2: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.12);
        --pure-material-safari-helper3: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.16);
        --pure-material-safari-helper4: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.24);
        display: inline-block;
        /* width: 200px; */
        color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
        font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
        font-size: 16px;
        line-height: 1.5;
        background-color: #0005;
        border-radius:16px;
        padding:0px 20px;
        /* margin:10px; */
        /* box-shadow: 0px 0px 5px 5px #4449 inset  */
    box-shadow:
/*
            0px 0px 2px 4px black,   
            0px 0px 5px 5px #555a; 
*/
        inset hsla(0,0%,15%, 1) 0 0px 0px 4px,
        inset hsla(0,0%,15%, .8) 0 -1px 2px 4px,
        inset hsla(0,0%,0%, .25) 0 -1px 0px 7px,
        /* inset hsla(0,0%,100%,.7) 0 2px 1px 7px, */
        hsla(0,0%, 0%,.15) 0 -5px 6px 4px,
        hsla(0,0%,40%,.5) 0 0px 12px 3px; 
    }






    /* Input */
    .pure-material-slider > input {
        -webkit-appearance: none;
        position: relative;
        top: 24px;
        display: block;
        margin: 0 0 -36px;
        width: 100%;
        height: 36px;
        background-color: transparent;
        cursor: pointer;
    }

    /* Without Span */
    .pure-material-slider > input:last-child {
        position: static;
        margin: 0;
    }

    /* Span */
    .pure-material-slider > span {
        display: inline-block;
        margin-bottom: 36px;
    }

    /* Focus */
    .pure-material-slider > input:focus {
        outline: none;
    }

    /* Disabled */
    .pure-material-slider > input:disabled {
        cursor: default;
        opacity: 0.38;
    }

    .pure-material-slider > input:disabled + span {
        color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
    }

    /* Webkit | Track */
    .pure-material-slider > input::-webkit-slider-runnable-track {
        margin: 17px 0;
        border-radius: 2px;
        width: 100%;
        height: 6px;
        /* background-color: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.24); */
        background-color: black;
        padding: 0 20px
    }

    /* Webkit | Thumb */
    .pure-material-slider > input::-webkit-slider-thumb {
        appearance: none;
        -webkit-appearance: none;
        border: none;
        border-radius: 50%;
        height: 34px;
        width: 34px;
        margin-top:-12px;
        /* background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243)); */
        background: url('round.png');
        /* background-color: #aaa; */
        /* transform: scale(12); */
        transition: box-shadow 0.2s;
        box-shadow: 0px 1px 1px 1px black
    }

    /* Webkit | Hover, Focus */
    .pure-material-slider:hover > input::-webkit-slider-thumb {
        box-shadow: 0 0 0 2px var(--pure-material-safari-helper1);
    }

    .pure-material-slider > input:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 2px var(--pure-material-safari-helper2);
    }

    .pure-material-slider:hover > input:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 2px var(--pure-material-safari-helper3);
    }

    /* Webkit | Active */
    .pure-material-slider > input:active::-webkit-slider-thumb {
        box-shadow: 0 0 0 2px var(--pure-material-safari-helper4) !important;
    }

    /* Webkit | Disabled */
    .pure-material-slider > input:disabled::-webkit-slider-runnable-track {
        background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
    }

    .pure-material-slider > input:disabled::-webkit-slider-thumb {
        background-color: rgb(var(--pure-material-onsurface-rgb, 0, 0, 0));
        color: rgb(var(--pure-material-surface-rgb, 255, 255, 255)); /* Safari */
        box-shadow: 0 0 0 1px rgb(var(--pure-material-surface-rgb, 255, 255, 255)) !important;
        transform: scale(4, 4);
    }

    /* Moz | Track */
    .pure-material-slider > input::-moz-range-track {
        margin: 17px 0;
        border-radius: 1px;
        width: 100%;
        height: 2px;
        background-color: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.24);
    }

    /* Moz | Thumb */
    .pure-material-slider > input::-moz-range-thumb {
        appearance: none;
        -moz-appearance: none;
        border: none;
        border-radius: 50%;
        height: 2px;
        width: 2px;
        background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
        transform: scale(6, 6);
        transition: box-shadow 0.2s;
    }

    /* Moz | Progress */
    .pure-material-slider > input::-moz-range-progress {
        border-radius: 1px;
        height: 2px;
        background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    }

    /* Moz | Hover, Focus */
    .pure-material-slider:hover > input:hover::-moz-range-thumb {
        box-shadow: 0 0 0 2px rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.04);
    }

    .pure-material-slider > input:focus::-moz-range-thumb {
        box-shadow: 0 0 0 2px rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.12);
    }

    .pure-material-slider:hover > input:focus::-moz-range-thumb {
        box-shadow: 0 0 0 2px rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.16);
    }

    /* Moz | Active */
    .pure-material-slider > input:active::-moz-range-thumb {
        box-shadow: 0 0 0 2px rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.24) !important;
    }

    /* Moz | Disabled */
    .pure-material-slider > input:disabled::-moz-range-track {
        background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
    }

    .pure-material-slider > input:disabled::-moz-range-progress {
        background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
    }

    .pure-material-slider > input:disabled::-moz-range-thumb {
        background-color: rgb(var(--pure-material-onsurface-rgb, 0, 0, 0));
        box-shadow: 0 0 0 1px rgb(var(--pure-material-surface-rgb, 255, 255, 255)) !important;
        transform: scale(4, 4);
    }

    .pure-material-slider > input::-moz-focus-outer {
        border: none;
    }

    /* MS | Track */
    .pure-material-slider > input::-ms-track {
        box-sizing: border-box;
        margin: 17px 0;
        border: none;
        border-radius: 1px;
        padding: 0 17px;
        width: 100%;
        height: 2px;
        background-color: transparent;
    }

    .pure-material-slider > input::-ms-fill-lower {
        border-radius: 1px;
        height: 2px;
        background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
    }

    /* MS | Progress */
    .pure-material-slider > input::-ms-fill-upper {
        border-radius: 1px;
        height: 2px;
        background-color: rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.24);
    }

    /* MS | Thumb */
    .pure-material-slider > input::-ms-thumb {
        appearance: none;
        margin: 0 17px;
        border: none;
        border-radius: 50%;
        height: 2px;
        width: 2px;
        background-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
        transform: scale(6, 6);
        transition: box-shadow 0.2s;
    }

    /* MS | Hover, Focus */
    .pure-material-slider:hover > input::-ms-thumb {
        box-shadow: 0 0 0 2px rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.04);
    }

    .pure-material-slider > input:focus::-ms-thumb {
        box-shadow: 0 0 0 2px rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.12);
    }

    .pure-material-slider:hover > input:focus::-ms-thumb {
        box-shadow: 0 0 0 2px rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.16);
    }

    /* MS | Active */
    .pure-material-slider > input:active::-ms-thumb {
        box-shadow: 0 0 0 2px rgba(var(--pure-material-primary-rgb, 33, 150, 243), 0.24) !important;
    }

    /* MS | Disabled */
    .pure-material-slider > input:disabled::-ms-fill-lower {
        background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
    }

    .pure-material-slider > input:disabled::-ms-fill-upper {
        background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
        opacity: 0.38;
    }

    .pure-material-slider > input:disabled::-ms-thumb {
        background-color: rgb(var(--pure-material-onsurface-rgb, 0, 0, 0));
        box-shadow: 0 0 0 1px rgb(var(--pure-material-surface-rgb, 255, 255, 255)) !important;
        transform: scale(4, 4);
    }
</style>
