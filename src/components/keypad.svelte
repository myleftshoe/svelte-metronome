<style>
    .container { 
        display: flex;
        height:50vh;
        width:100vw;
        transition: all .3s ease;
        flex-basis:100%;
    }
    .hidden {
        flex-basis:0;
    }
    .keypad { 
        display: grid;
        height:100%;
        width:100%;
        grid-gap: 5px;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }
    button {
        background-color: #333;
        border: none;
        outline:none;
        cursor: pointer;
        color:white;
        font-size:6.25vh;
    }
    .on-beat { 
        grid-row:1/3; 
        grid-column:1/3; 
    }
    .off-beat { 
        grid-row:1/3; 
        grid-column:3/5; 
    }
    .onoff {
        grid-row:3/5;
        grid-column:1/3;
    }
</style>
<script>
    export let visible = false;
    export let pattern = [];
    export let playing = false;
    export let bpm;
    export let clicks;

    import { ClearIcon } from '../svgicons';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
    
    function change (value) {
		dispatch('change', value);
	}

    function addOffBeat() {
        pattern = [...pattern, 0];
    }

    function addOnBeat() {
        pattern = [...pattern, 1];
    }
    
    function removeOne() {
        pattern.pop();
        pattern=[...pattern];
    }

    function clearAll() {
        pattern = [];
    }

    function setClicks (value) {
		clicks = value < 0 ? 0 : value > 9 ? 9 : value;
		dispatch('click', clicks);
    }
    
</script>
<div class=container class:hidden={!visible}>
<div class='keypad'>
    <button class='on-beat' on:click={addOnBeat}>|</button>
    <button class='off-beat' on:click={addOffBeat}>'</button>
    <button on:click={removeOne}><ClearIcon/></button>
    <button on:click={clearAll}>X</button>
    <button class='onoff' on:click={() => {playing = !playing}}>{playing ? '▮▮' : '▶'}</button>
    <button on:click={() => change(bpm+20)}>+20</button>
    <button on:click={() => change(bpm+1)}>+1</button>
    <button on:click={() => setClicks(clicks+1)}>+</button>
    <button on:click={() => change(bpm-20)}>-20</button>
    <button on:click={() => change(bpm-1)}>-1</button>
    <button on:click={() => setClicks(clicks-1)}>-</button>
</div>
</div>