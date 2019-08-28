<style>
	.container {
        display:flex;
        flex-direction: row;
        align-items:center;
        width:100%;
    }
    .bars {
        display: flex;
        flex-direction: row;
        width:100%;
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
    .hotspot {
        /* background-color: red; */
        width:32px;
        height:100%;
    }
</style>

<script>
    import { slide } from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';

    export let beats=4;
    export let bars = [...Array(16).fill(false)];
    export let playingBeat;

    const dispatch = createEventDispatcher();
    function toggleBar(id) {
        bars[id] = !bars[id];
        dispatch('change', {value:[...bars]})
    }
    function handleWheel(e) {
        beats -= Math.sign(e.deltaY);
        if (beats < 1)
            beats = 1;
        if (beats > 16)
            beats = 16;
    }
</script>


<div class='container' on:wheel|stopPropagation={handleWheel}>
    <div class='hotspot' on:click={() => {beats--}}></div>
    <div class='bars'>
        {#each bars.slice(0, beats) as value, id}
            <button {id} class={value || playingBeat === id ? 'bar-on': 'bar'} {value} 
                aria-label={`beat ${id + 1}`}
                transition:slide|local 
                on:click={e => toggleBar(id)}
            />
        {/each}
    </div>
    <div class='hotspot' on:click={() => {beats++}}></div>
</div>