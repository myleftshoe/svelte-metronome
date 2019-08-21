<script>
    export let value = 5;
    export let step = 1;
    export let min = 0;
    export let max = 10;
    export let onChange;

    function decrement() {
        value = value - step; 
        if (value < min)
            value = min;
        onChange(value);
    }

    function increment() {
        value = value + step; 
        if (value > max)
            value = max;
        onChange(value);
    }

    function handleChange(e) {
        value = parseInt(e.target.value);
        onChange(value);
    }

</script>

<div>
    <button on:click={decrement} value={value}>-</button>
        <input type='number' min={min} max={max} value={value} on:change={handleChange}/>
    <button on:click={increment} value={value}>+</button>
</div>


