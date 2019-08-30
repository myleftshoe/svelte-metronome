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
		<div slot='bpm-control' >
			<BpmControl  bind:value={bpm}/>
		</div>
		<div slot='play'>
			<PlayButton bind:playing>
				{playing ? 'Pause' : 'Play'}
			</PlayButton>
		</div>
		<div slot='beats-control'>
			<BeatsControl bind:beats on:change={updateBeatsArray} activeId={playingBeat}></BeatsControl>
		</div>
		<div slot='clicks'>
			<!-- <NumericInput label=clicks bind:value={clicks} min={0} max={9}/> -->
			<!-- <ClicksControl bind:value={clicks}></ClicksControl> -->
		</div>
		<div slot='beat-buttons'>
			<Flex style='justify-content:space-between; background-color:#7770; padding:5px; border-radius:5px;'>
				<NumericInput compact label=clicks bind:value={clicks} min={0} max={9}/>
				<NumericInput compact label=beats bind:value={beats} on:change={updateBeatsArray} min={1} max={16}/>
				<!-- <Crementor step=-1></Crementor>
				<Crementor></Crementor>
				<Crementor step=-1></Crementor>
				<Crementor></Crementor> -->
			</Flex>
		</div>
	</Layout>
{/if}