<style>
	.container {
        display:grid;
        /* padding:10.0vh; */
        border-radius:1.5vh;
        height:100%;
        align-items:center;
        justify-items:center;
        /* grid-auto-flow: row; */
        /* background:url('wood.png'); */
        /* box-shadow: 
            0px 0px 4px 4px #000f inset,
            0px 0px 8px 2px #fff8 inset */
    }
	.lights-container {
        display:grid;
        padding:1.0vh;
        border-radius:1.5vh;
        height:calc(100% - 10vh);
        width:calc(100% - 10vh);
        grid-auto-flow: row;
        /* grid-gap:5vh; */
        box-shadow: 0px 0px 10px 25px #577 inset
    }
    @media only screen and (orientation: landscape) {
        .lights-container {
            grid-auto-flow:column;
        }
    }
    </style>

<script>
    import { slide } from 'svelte/transition';
    import {createEventDispatcher, onMount} from 'svelte';
    import Bar from './bar.svelte';
    import Crementor from '../crementor.svelte'
    
    export let beats = 2;
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

    function animate() {
        setTimeout(() => {
            for(let i=0; i<beats; i++) {
                setTimeout(() => { activeId = i;},100 * i)
            } 
            setTimeout(() => {
                activeId = null;
                setTimeout(() => setTimeout(activeId = undefined),300)
            }, 100*(beats + 1));
        }, 1000)
    }

    onMount(animate);

</script>


<!-- <div class='container' on:wheel|stopPropagation={handleWheel}> -->
    <!-- <label for='bars' style='visibility: hidden'>Beats</label> -->
    <div class='container' tabindex="0" aria-label='beats'>
        <div class='lights-container'>
            {#each bars.slice(0, beats) as selected, id}
                <Bar {id} {selected} active={id === activeId || activeId === null } on:click={toggleBar}></Bar>
            {/each}
        </div>
    </div>
<!-- </div> -->