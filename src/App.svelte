<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items:center;
		justify-content: space-around;
		height: 100vh;
		width:100vw;
		/* background-color: rgba(256,0,0,.08); */
	}
	@media only screen and (orientation: landscape) {
		.container {
			flex-direction: row;
		}
	}
</style>

<script>
	import Theme from './theme.svelte'
	import StartStopButton from './components/start-stop-button.svelte';
	import BpmSlider from './components/bpm-slider.svelte';
	import NumericInput from './components/input-numeric.svelte';
	import {onMount} from 'svelte';
	import BpmControl from './components/bpm-control.svelte';
	import { fade } from 'svelte/transition';
	import metronome from './metronome';
	import BeatsControl from './components/beats-control.svelte';
	import ClicksControl from './components/clicks-control.svelte';

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
		<BpmControl bind:value={bpm}/>
		<StartStopButton bind:playing>
			{playing ? 'Pause' : 'Play'}
		</StartStopButton>
		<p></p>
		<BeatsControl bind:beats on:change={updateBeatsArray}></BeatsControl>
		<NumericInput label=clicks bind:value={clicks} min={0} max={9}/>
		<!-- <ClicksControl bind:value={clicks}></ClicksControl> -->
	</div>
{/if}