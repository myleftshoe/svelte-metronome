<style>
	.container {
        /* position:relative; */
        display:flex;
        flex-direction: column;
        align-items:center;
        width:80%;
    }
    .slider {
        /* position: absolute; */
        width:100%;
        height:100%;
        /* opacity:.3; */
    }
    input[type=range]{
        pointer-events: none;
        height:100%;
        -webkit-appearance: none;
        background-color: transparent;
    }
    /* input[type=range]::-webkit-slider-runnable-track {
        height: 100%;
    } */

    input[type=range]::-webkit-slider-thumb{/*Webkit Browsers like Chome and Safari*/
        -webkit-appearance: none;
        pointer-events: auto;
        /* height:100%; */
        height: 2em;
        width:2em;
        cursor: pointer;
        /* border:1px solid white; */
        border-radius: 1em;
        margin:1.2em;
        background: var(--primary-color);
        opacity:0.1;
    }
    input[type=range]::-moz-range-thumb{/*Firefox*/
        pointer-events: auto;
    }
    input[type=range]::-ms-thumb{/*Internet Explorer*/
        pointer-events: auto;
    }    


    .bars {
        display: flex;
        flex-direction: row;
        /* align-items:stretch; */
        width:100%;
        /* background: red */
    }
    .bar {
        margin:2px;
        padding:0;
        border-radius: 2px;
        border: 1px solid var(--secondary-color);
        flex:1;
        height:70px;
        width:auto;
        background-color: transparent;
    }
    .bar-on {
        margin:2px;
        padding:0;
        border-radius: 2px;
        border: 1px solid #ff9a9a;
        /* border:none; */
        flex:1;
        height:70px;
        width:auto;
        background-color: var(--primary-color);
    }
</style>

<script>
    import { slide } from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';

    export let beats=4;
	let showItems = true;
	// let i = 5;
    export let items = [...Array(16).fill(false)];

    const dispatch = createEventDispatcher();
    function toggleBar(id) {
        items[id] = !items[id];
        // items = [...items];
        dispatch('change', {value:[...items]})

    }
</script>


<div class='container'>
    <input class=slider type="range" bind:value={beats} min=1 max=16/>
    <div class='bars'>
        {#if showItems}
            {#each items.slice(0, beats) as value, id}
                <button {id} class={value ? 'bar-on': 'bar'} {value} transition:slide|local 
                    on:click={e => toggleBar(id)}
                />
            {/each}
        {/if}
    </div>
</div>