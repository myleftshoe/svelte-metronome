<style>
    .container {
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content: center;
    }
    input {
        background-color: transparent;
        border:none;
        padding:0;
        font-size: 2em;
        color: #aaa;
        text-align:center;
        display:inline-block
    }
/* Hide HTML5 Up and Down arrows. */
input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}    
    .value-container {
        /* background-color: red; */
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content:center;
    }
</style>

<script>

    import Crementor from './crementor.svelte'
    import {afterUpdate, createEventDispatcher } from 'svelte';
    export let value = 5;
    export let step = 1;
    export let min = 0;
    export let max = 10;
    export let label='';
    let node;

    const dispatch = createEventDispatcher();

    function decrement() {
        setValue(value - step);
    }

    function increment() {
        setValue(value + step);
    }

    function setValue(newValue) {
        console.log('setValue',newValue)
        if (newValue < min || isNaN(newValue))
            value = min;
        else if (newValue > max)
            value = max;
        else
            value = newValue;
    }

    function handleInput(e) {

        let newValue = parseInt(e.target.value);
        setValue(parseInt(e.target.value));
        node = e.target;
    }


    function handleChange(e) {
        console.log('handleChange',e.detail.value)
        setValue(parseInt(e.detail.value));
        dispatch("change", { value });
    }

    afterUpdate(() => {
        if (value === min && node)
            node.select();
        node = undefined;
    })

</script>

<div class=container>
    <Crementor on:change={handleChange} {value} step={-1}/>
    <div class=value-container>
        <input id={label} on:keydown={() => {}} type='number' min={min} max={max} bind:value on:input={handleInput}/>
        <label for={label}>{label}</label>
    </div>
    <Crementor on:change={handleChange} {value} step={+1}/>
</div>


