<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items:center;
		justify-content: center;
		/* background-color: rgba(256,0,0,.08); */
	}
	@media only screen and (max-height: 530px) and (orientation: landscape) {
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
	import BeatsControl from './components/beats-control';
	import ClicksControl from './components/clicks-control.svelte';
	import loadScriptAsync from './utils/load-script-async';

	let bpm = 180;
	let beats = 4;
	let clicks = 0;
	let playing = false;
	let prev = false;
	let beatsArray = new Array(beats).fill(false);
	let mounted = false;
	let playingBeat;

	onMount(() => {mounted = true;})

	// Tone cannot be imported as a node module with svelte - Tone/usestrict problem.
	// loadScriptAsync('https://cdnjs.cloudflare.com/ajax/libs/tone/13.0.1/Tone.min.js')
	// .then(function(){
	// 	metronome.init(bpm, beats);
	// });

	metronome.beatCallback = function(id) {
		playingBeat = parseInt(id.split(':')[1]);
	}

	// metronome.init(bpm, beats);

    function handleWheel(e) {
		const multiplier = e.shiftKey ? 1 : 10;
        bpm -= Math.sign(e.deltaY) * multiplier;
    }

    function handleKeydown(e) {
		return;
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
	
	function updateBeatsArray(e) {
		beatsArray = [...e.detail.value];
	}

	$: {
		beatsArray = [...beatsArray];
		beatsArray.length = beats || 1;
		if (playing) 
			metronome.play(bpm, beatsArray, clicks);
		else if (playing !== prev) 
			metronome.stop();	
		prev = playing;	
	}


</script>

{#if mounted}
	<div class='container' id="slider" transition:fade={{duration:1000}}>
		<BpmControl bind:value={bpm}/>
		<StartStopButton bind:playing>
			{playing ? 'Pause' : 'Play'}
		</StartStopButton>
		<p></p>
		<BeatsControl bind:beats on:change={updateBeatsArray} activeId={playingBeat}></BeatsControl>
		<NumericInput label=clicks bind:value={clicks} min={0} max={9}/>
		<!-- <ClicksControl bind:value={clicks}></ClicksControl> -->
	</div>
{/if}