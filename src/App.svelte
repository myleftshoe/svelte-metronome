<script>
	import {onMount} from 'svelte';
	import Theme from './theme.svelte'
	import Layout from './layout.svelte';
	import { BpmControl, BeatsControl, ClicksControl, PlayButton, NumericInput, Crementor, Flex } from './components';
	import metronome from './metronome';

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
		<div slot='top' >
			<input type=range width=100%/>
		</div>
		<div slot='left' >
			<input type=range width=100%/>
		</div>
		<div slot='right' >
			<input type=range width=100%/>
		</div>
		<div slot='bottom' >
			<input type=range width=100%/>
		</div>
	</Layout>
{/if}