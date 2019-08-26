<script>
    export let value = 0;
    export let step = 1;

    function increment() {
        value += step;
    }
</script>

<button on:click={increment} value={value}>+</button>


