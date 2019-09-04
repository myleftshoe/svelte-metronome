<style>
	.container {
        grid-row:3;
		grid-column:2;
		display:grid;
		z-index:1;
        display:grid;
        border-radius:1.5vh;
        height:100%;
        align-items:center;
        justify-items:center;
        outline:none;
    }
	.lights-container {
        display:grid;
        padding:1.0vh;
        border-radius:1.5vh;
        height:100%;
        width:100%;
        grid-auto-flow: row;
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
    import { onMount } from 'svelte';
    import Bar from './bar.svelte';
    
    export let pattern = [];
    export let active = [0,0];

    function handleOffBeatClick() {
        pattern = [...pattern, 0];
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

</script>

<div class='container' tabindex="0" aria-label='beats'>
    <div class='lights-container'>
        <Bar id='left-bar' active={active[0]} selected on:click={handleOnBeatClick}/>
        <Bar id='right-bar' active={active[1]} on:click={handleOffBeatClick}/>
    </div>
</div>
