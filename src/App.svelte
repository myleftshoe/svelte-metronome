<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items:center;
		justify-content: space-evenly;
		height: 100vh;
		width:100vw;
		/* background-color: rgba(256,0,0,.08); */
	}
	@media only screen and (orientation: landscape) {
		.container {
			flex-direction: row;
		}
	}
	.beats-clicks {
		display: flex;
		flex-direction: row;
		width:100%;
		height:6em;
		align-items:center;
		justify-content:center;
		/* background: red */
	}
	.col {
		display:flex;
		flex:1; 
		justify-content:center;
	}
</style>

<script>
	import Theme from './theme.svelte'
	import StartStopButton from './components/start-stop-button.svelte';
	import BpmSlider from './components/bpm-slider.svelte';
	import NumericInput from './components/input-numeric.svelte';
	import {onMount} from 'svelte';
	// import pureknob from './pureknob.js'
	// import Slider from "@maslick/radiaslider";
	// import LinearSlider from "@maslick/radiaslider/src/slider-linear";
	// import CircularSlider from './components/circular-slider.svelte';
	import BpmControl from './components/bpm-control.svelte';
	import { fade } from 'svelte/transition';
	import metronome from './metronome';
	import Beats from './components/beats.svelte';
	import BeatsControl from './components/beats-control.svelte';

	let bpm = 180;
	let beats = 4;
	let clicks = 0;
	let playing = false;
	let beatsArray = new Array(beats).fill(false);
	let visible = false;
	onMount(() => {
		visible = true;
	})
	metronome.init(bpm, beats);
	
    function handleWheel(e) {
		console.log(e);
		const multiplier = e.shiftKey ? 1 : 10;
        bpm -= Math.sign(e.deltaY) * multiplier;
    }

    function handleKeydown(e) {
		return;
		console.log(e.key);
		const multiplier = e.shiftKey ? 1 : 5;
		switch (e.key) {
			case 'ArrowUp': {
				bpm = Math.floor(bpm/multiplier) * multiplier + multiplier; 
				break;
			}
			case 'ArrowDown': {
				bpm = Math.ceil(bpm/multiplier) * multiplier - multiplier;
				break;
			}
			case ' ': {
				playing = !playing;
				break;
			}
			default:
		}
        // if (e.key === 'ArrowUp') 
		// 	bpm = Math.floor(bpm/multiplier) * multiplier + multiplier;
        // if (e.key === 'ArrowDown')
        // console.log(bpm);
		// if (e.key === 'ArrowRight')
		// 	beats += 1
		// if (e.key === 'ArrowLeft')
		// 	beats -= 1

    }

	document.addEventListener('keydown', handleKeydown);
	document.addEventListener('wheel', handleWheel);
	// function updateBeatsArray(e) {
	// 	beatsArray = [...beatsArray];
	// 	beatsArray[e.target.value] = e.target.checked;
	// }

	function updateBeatsArray(e) {
		beatsArray = [...e.detail.value];
	}

	$: metronome.bpm = bpm;

	$: {
		beatsArray = [...beatsArray];
		console.log(beats)
		beatsArray.length = beats || 1;
		if (playing)
			metronome.play(beatsArray, clicks);
		else 
			metronome.stop();		
	}

</script>
{#if visible}
<div class='container' id="slider" transition:fade={{duration:1000}}>
	<BpmControl bind:value={bpm} step=5/>
	        <!-- <div>▋▋</div> -->

	<StartStopButton bind:playing>
		{playing ? 'Pause' : 'Play'}
	</StartStopButton>
	<!-- <div class=beats-clicks>
		<div class=col>
			<NumericInput label=beats bind:value={beats} min={1} max={16}/>
		</div>
		<div class=col> -->
		<!-- </div>
	</div> -->
	<!-- <span id="value1"></span>
	<h2>{bpm}</h2>
	<BpmSlider bind:value={bpm}/> -->
	<!-- <div>Beats</div> -->
	<!-- <div>Clicks</div>
	<NumericInput bind:value={clicks} min={0} max={9}/>
	<div>Groove</div> -->
	<!-- <div>
		{#each beatsArray as beat, i}
			<input type='checkbox' value={i} on:change={updateBeatsArray} checked={beatsArray[i]}/>
		{/each}
	</div> -->
	<Beats bind:beats on:change={updateBeatsArray}></Beats>
			<NumericInput label=clicks bind:value={clicks} min={0} max={9}/>
	<!-- <p/> -->
</div>
{/if}