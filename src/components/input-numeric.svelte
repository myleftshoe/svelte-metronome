<script>
    import {afterUpdate} from 'svelte';
    export let value = 5;
    export let step = 1;
    export let min = 0;
    export let max = 10;
    let node;

    function decrement() {
        setValue(value - step); 
    }

    function increment() {
        setValue(value + step); 
    }

    function setValue(newValue) {
        if (newValue < min)
            value = min;
        else if (newValue > max)
            value = max;
        else
            value = newValue;
    }

    function handleInput(e) {
        let newValue = parseInt(e.target.value);
        if (isNaN(newValue))
            newValue = min;
        setValue(parseInt(newValue));
        node = e.target;
    }

    afterUpdate(() => {
        if (value === min && node)
            node.select();
        node = undefined; 
    })
</script>

<div>
    <button on:click={decrement} value={value}>-</button>
    <input type='number' min={min} max={max} bind:value on:input={handleInput}/>
    <button on:click={increment} value={value}>+</button>
</div>


