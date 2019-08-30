<style>
    span {
        pointer-events: auto;
        font-size: 1em;
        background: #fff2;
        width:2.4em;
        height:2.4em;
        display:flex;
        align-items:center;
        justify-content:center;
        text-align:center;
        cursor:pointer;
        border-radius: 50%;
        margin: 0em .5em;
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


