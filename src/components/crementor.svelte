<style>
    span {
        pointer-events: auto;
        font-size: 2em;
        /* background: green; */
        width:1.2em;
        height:100%;
        display:flex;
        align-items:center;
        justify-content:center;
    }
</style>

<script>
    import {createEventDispatcher} from 'svelte';
    export let value = 0;
    export let step = 1;

    const dispatch = createEventDispatcher();

    function decrement() {
        dispatch("change", { value: value + step });
    }
</script>

<span on:click={decrement} {value}>{step < 0 ? '-' : '+'}</span>


