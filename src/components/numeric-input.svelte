<style>
    .container {
        display:flex;
        flex-direction:row;
        align-items:center;
        justify-content: center;
        /* background-color: #f001; */
    }
    input {
        background-color: transparent;
        border:none;
        padding:0;
        font-size: 2em;
        color: #aaa;
        text-align:center;
        display:inline-block;
        width:2.2em;
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
    .compact {
        font-size: 1.2em;
        width:1.5em;
    }
    label.compact {
        font-size: .8em;
        margin-right:1em;
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
    export let compact = false;

    let node;

    const dispatch = createEventDispatcher();

    function decrement() {
        setValue(value - step);
    }

    function increment() {
        setValue(value + step);
    }

    function setValue(newValue) {
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
        <input class:compact id={label} on:keydown={() => {}} type='number' min={min} max={max} bind:value on:input={handleInput}/>
        <label class:compact for={label}>{label}</label>
    </div>
    <Crementor on:change={handleChange} {value} step={+1}/>
</div>

