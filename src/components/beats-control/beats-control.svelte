<style>
	.container {
        /* display:flex;
        flex-direction: column;
        align-items: center;
        width:100%; */
    }
    .crementors {
        display:flex;
        flex-direction: row;
        /* align-items: end; */
        justify-content: flex-end;
        width:100%;
    }
    .bars {
        display: flex;
        flex-direction: row;
        height:20vh;
        width:100%;
    }
</style>

<script>
    import { slide } from 'svelte/transition';
    import {createEventDispatcher} from 'svelte';
    import Bar from './bar.svelte';
    import Crementor from '../crementor.svelte'
    
    export let beats = 4;
    export let max = 16;
    export let min = 1;
    export let bars = [...Array(max).fill(false)];
    export let activeId;

    const dispatch = createEventDispatcher();
    function toggleBar(e) {
        const id = e.target.id;
        bars[id] = !bars[id];
        dispatch('change', {value:[...bars]})
    }

    function handleWheel(e) {
        crement(Math.sign(e.deltaY)*-1);
    }

    function handleHotspotClick(e) {
        crement(parseInt(e.target.dataset.value))
    }

    function crement(value) {
        beats += value;
        if (beats < min)
            beats = min;
        if (beats > max)
            beats = max;
        dispatch('change', {value:[...bars]})

    }
</script>


<div class='container' on:wheel|stopPropagation={handleWheel}>
    <!-- <div class=crementors>
        <Crementor step=-1></Crementor>
        <Crementor></Crementor>
    </div> -->
    <!-- <label for='bars' style='visibility: hidden'>Beats</label> -->
    <div class='bars' tabindex="0" aria-label='beats'>
        {#each bars.slice(0, beats) as selected, id}
            <Bar {id} {selected} active={id === activeId } on:click={toggleBar}></Bar>
        {/each}
    </div>
</div>