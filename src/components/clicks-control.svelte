<style>
	.container {
        display:flex;
        flex-direction: column;
        align-items:center;
    }
    .bar { 
        cursor: pointer;
        background-color: transparent;
        border:none;
        border-radius:50%;
        color: var(--texr-color);
        outline: none;
        padding:.1em .4em;
        margin:.5em;
    }
    .selected { 
        background-color: var(--primary-color);
        color:black
    }
</style>

<script>
    import { createEventDispatcher } from 'svelte';

    export let value=4;
    export let bars = [...Array(10).fill()];

    const dispatch = createEventDispatcher();
    function setValue(e) {
        value = parseInt(e.target.id);
        console.log(value)
        dispatch('change', value)
    }
</script>

<div class='container'>
    <label for='bars' style='visibility:hidden'>Clicks</label>
    <div class='bars' id='bars' tabindex="0" name='clicks' aria-label=clicks>
        {#each bars as _, id}
            <button id={id} class=bar class:selected={value == (id)} value={id} on:click={setValue}>
                {id }
            </button>
        {/each}
    </div>
</div>