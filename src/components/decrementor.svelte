<style>
    span {
        font-size: 2em;
        padding:.2em .5em;
        background: red;
    }
</style>

<script>
    import {createEventDispatcher} from 'svelte';
    export let value = 0;
    export let step = 1;

    const dispatch = createEventDispatcher();

    function decrement() {
        // value -= step;
        dispatch("change", { value: value - step });
    }
</script>

<span on:click={decrement} {value}>-</span>


