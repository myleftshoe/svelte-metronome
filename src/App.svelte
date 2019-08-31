<script>
	import {onMount} from 'svelte';
	import Theme from './theme.svelte'
	import Layout from './layout.svelte';
	import { Slider, BeatsControl, PlayButton } from './components';
	import metronome from './metronome';

	let bpm = 200;
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
		const value = e.detail.value;
		if (typeof value === 'number')
			beatsArray=beatsArray.slice(0,value);
		else		
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
		<!-- <div slot='top' > -->
			<!-- <div slot='top'>{clicks} clicks</div>
			<div slot='top'>{bpm} bpm</div>
			<div slot='top'>{beats} beats</div> -->
		<!-- </div> -->
		<div slot='top1' >
			<Slider bind:value={bpm} min=40 max=360 step=10 style='width:80vw'/>
		</div>
		<div slot='top2'>
			<Slider bind:value={clicks} min=0 max=9 style='width:30vw'/>
		</div>
		<!-- <div slot='top2' >
			<PlayButton bind:playing>Play</PlayButton>
		</div> -->
		<div slot='top2' >
			<Slider bind:value={beats} min=1 max=16 style='width:30vw'/>
		</div>
		<div slot='middle' >
			<BeatsControl bind:beats on:change={updateBeatsArray} activeId={playingBeat}/>
		</div>
		<div slot='bottom' >
			<PlayButton bind:playing>Play</PlayButton>
		</div>
	</Layout>
{/if}