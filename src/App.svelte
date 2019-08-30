<script>
	import {onMount} from 'svelte';
	import Theme from './theme.svelte'
	import Layout from './layout.svelte';
	import StartStopButton from './components/start-stop-button.svelte';
	import NumericInput from './components/input-numeric.svelte';
	import metronome from './metronome';
	import BpmControl from './components/bpm-control.svelte';
	import BeatsControl from './components/beats-control';
	import ClicksControl from './components/clicks-control.svelte';

	let bpm = 180;
	let beats = 4;
	let clicks = 0;
	let playing = false;
	let previous = false;
	let beatsArray = new Array(beats).fill(false);
	let mounted = false;
	let playingBeat;

	onMount(() => {mounted = true;})

	metronome.beatCallback = function(id) {
		playingBeat = parseInt(id.split(':')[1]);
		setTimeout(() => {playingBeat = undefined}, 100)
	}

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
		else if (playing !== previous) 
			metronome.stop();	
		previous = playing;	
	}


</script>

{#if mounted}
	<Layout>
		<div slot='bpm-control' >
			<BpmControl  bind:value={bpm}/>
		</div>
		<div slot='play'>
			<StartStopButton bind:playing>
				{playing ? 'Pause' : 'Play'}
			</StartStopButton>
		</div>
		<div slot='beats-control'>
			<BeatsControl bind:beats on:change={updateBeatsArray} activeId={playingBeat}></BeatsControl>
		</div>
		<div slot=clicks>
			<NumericInput label=clicks bind:value={clicks} min={0} max={9}/>
		</div>
		<!-- <ClicksControl bind:value={clicks}></ClicksControl> -->
	</Layout>
{/if}