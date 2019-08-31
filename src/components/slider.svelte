<style>
    input {
        width: 100%;
        height: 100%;
        -webkit-appearance: slider-horizontal;
    }
    .vertical {
        -webkit-appearance: slider-vertical;
    }
</style>

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

<input style={$$props.style} type='range' class:vertical bind:value orient={vertical && "vertical"} {min} {max} {step}/>
