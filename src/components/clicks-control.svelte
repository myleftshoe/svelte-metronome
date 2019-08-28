<style>
	.container {
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content:center;
        width:100%;
        /* background-color: #00f3 */
    }
    .bars {
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content:center;
        /* background-color: #00f3 */
    }
    .bar {
        margin:2px;
        padding:0;
        border-radius: 2px;
        border: 1px solid var(--secondary-color);
        width:20px;
        height:20px;
        background-color: transparent;
    }
    .bar-on {
        margin:2px;
        padding:0;
        border-radius: 2px;
        border: 1px solid var(--secondary-color);
        width:20px;
        height:20px;
        background-color: var(--primary-color);
    }
    .hotspot {
        /* background-color: #f003; */
        flex:1;
        color:transparent;
        height:3em;
    }
</style>

<script>
    import { createEventDispatcher } from 'svelte';
    import { slide } from 'svelte/transition';
    import Crementor from './crementor.svelte'

    export let value=4;
    export let bars = [...Array(9).fill(false)];

    const dispatch = createEventDispatcher();
    function toggleBar(id) {
        bars[id] = !bars[id];
        dispatch('change', {value:[...bars]})
    }
    function handleChange(e) {
        value = e.detail.value;
    }
</script>


<div class='container'>
    <div class='hotspot' on:click={() => value--}>-
        <!-- <Crementor on:change={handleChange} {value} step={-1}/> -->
    </div>
    <div class='bars'>
        {#each bars.slice(0, value) as value, id}
            <button {id} class={value ? 'bar-on': 'bar'} {value} transition:slide|local 
                on:click={e => toggleBar(id)}
            />
        {/each}
    </div>
    <div class='hotspot' on:click={() => value++}>+
        <!-- <Crementor on:change={handleChange} {value} step={+1}/> -->
    </div>
</div>