<style>
	.container {
        display:grid;
        /* padding:10.0vh; */
        border-radius:1.5vh;
        height:100%;
        align-items:center;
        justify-items:center;
        outline:none;
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
    
    export let pattern = [];
    export let active = [0,0];

    const dispatch = createEventDispatcher();

    function handleOffBeatClick() {
        pattern = [...pattern, 0];
        console.log(pattern);
    }

    function handleOnBeatClick() {
        pattern = [...pattern, 1];
    }

    function animate() {
        setTimeout(() => {
            setTimeout(() => { active[0] = 1;}, 100)
            setTimeout(() => { active[0] = 0;}, 200)
            setTimeout(() => { active[1] = 1;}, 150)
            setTimeout(() => { active[1] = 0;}, 250)
            setTimeout(() => { active = [1,1];}, 500)
            setTimeout(() => { active = [0,0];}, 600)
        }, 1000)
    }

    onMount(animate);

    $: {console.log(active)}

</script>


<!-- <label for='bars' style='visibility: hidden'>Beats</label> -->
<div class='container' tabindex="0" aria-label='beats'>
    <div class='lights-container'>
        <Bar active={active[0]} selected on:click={handleOnBeatClick}/>
        <Bar active={active[1]} on:click={handleOffBeatClick}/>
    </div>
</div>
