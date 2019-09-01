<style>
img { 
	/* box-shadow: 0px 0px 10px 2px #000; */
	position: absolute;
	bottom:20px;
	right:80px;
 }
</style>
<script>
	import {onMount} from 'svelte';
	import Theme from './theme.svelte'
	import Layout from './layout.svelte';
	import { Slider, BeatsControl, PlayButton, Controls, Beats } from './components';
	import metronome from './metronome';

	let bpm = 200;
	let clicks = 0;
	let playing = false;
	let previous = false;
	let pattern = [];
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
	document.addEventListener('contextmenu', e => e.preventDefault());	
	
	$: {
		// pattern = [...pattern];
		if (playing) 
			metronome.play(bpm, pattern, clicks);
		else if (playing !== previous) 
			metronome.stop();	
		previous = playing;	
	}

</script>

{#if mounted}
	<div>
		<img src='neonome.png'/>
		</div>
	<Layout>
		<div slot='middle' >
			<BeatsControl bind:pattern active={[pattern[playingBeat] === 1, pattern[playingBeat] === 0]}/>
		</div>
		<div slot='bottom' >
			<!-- <PlayButton bind:playing>Play</PlayButton> -->
		</div>
	</Layout>
	<Controls>
		<div slot=bpm>
			<Slider bind:value={bpm} min=40 max=360 step=10 style='width:80vw'/>
		</div>
		<div slot=clicks>
			<Slider bind:value={clicks} min=0 max=9 style='width:80vw'/>
		</div>
	</Controls>
	<Beats bind:pattern activeId={playingBeat}/>
{/if}