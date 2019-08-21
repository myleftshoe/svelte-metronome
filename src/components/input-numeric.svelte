<script>
    export let value = 5;
    export let step = 1;
    export let min = 0;
    export let max = 10;

    function decrement() {
        value = value - step; 
        if (value < min)
            value = min;
    }

    function increment() {
        value = value + step; 
        if (value > max)
            value = max;
    }

    function handleChange(e) {
        value = parseInt(e.target.value);
    }

</script>

<div>
    <button on:click={decrement} value={value}>-</button>
    <input type='number' min={min} max={max} bind:value/>
    <button on:click={increment} value={value}>+</button>
</div>


