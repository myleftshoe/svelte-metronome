<style>
	.display {
		grid-column: 2;
		grid-row: 2;
		display:flex;
		align-items:center;
		justify-content: center;
		font-size:7vh;
		color:#fff3;
		text-shadow: .5vh .5vh 1vh #0008;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
	}
	.clicks {
		grid-column: 1;
		grid-row: 2/4;
		display:flex;
		flex-direction: column;
	}
	.bpm {
		grid-column: 3;
		grid-row: 2/4;
		display:flex;
		flex-direction: column;
	}	
</style>
<script>
	import {onMount, afterUpdate} from 'svelte';
	import {fade} from 'svelte/transition';
	import Theme from './theme.svelte'
	import Layout from './layout.svelte';
	import { Slider, BeatsControl, PlayButton, Beats, Underlay, Topbar, Bottombar, Ripple } from './components';
	import metronome from './metronome';

	let bpm = 200;
	let clicks = 0;
	let playing = true;
	let previous = false;
	let pattern = [];
	let mounted = false;
	let playingBeat;
	let visible = false;
	let previousBpm = bpm;
	let previousClicks = clicks;

	onMount(() => {mounted = true;})

	metronome.beatCallback = function(id) {
		playingBeat = parseInt(id.split(':')[1]);
		setTimeout(() => {playingBeat = undefined}, 50)
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

	function setClicks (value) {
		if (value >= 0 && value <= 9)
			clicks = value;
	}

	function setBpm (value) {
		if (value >= 40 && value <= 360)
			bpm = value;
	}

	function resetBpm() {
		
	}

	let to;
	afterUpdate(() => {
		if (previousBpm !== bpm || previousClicks !== clicks) {
			clearTimeout(to);
			to = setTimeout(() => {
				previousBpm = bpm;
				previousClicks = clicks;
			}, 3000);
		}
	});
	// document.addEventListener('keydown', handleKeydown);
	// document.addEventListener('wheel', handleWheel);	
	// document.addEventListener('contextmenu', e => e.preventDefault());	
	
	$: {
		// pattern = [...pattern];
		if (playing) 
			metronome.play(bpm, pattern, clicks);
		else if (playing !== previous) 
			metronome.stop();	
		previous = playing;	
	}

	$: text = bpm !== previousBpm ? `${bpm} bpm` : previousClicks !== clicks ? `${clicks} clicks` : '';
	

</script>

<svelte:window 
	on:contextmenu|preventDefault
/>
<svelte:body 
	on:keydown={handleKeydown}
	on:wheel={handleWheel}
/>

{#if mounted}
	<Underlay on:click={() => visible = !visible}>

	</Underlay>
	<Layout>
		<div slot='content' >
			<BeatsControl bind:pattern active={[pattern[playingBeat] === 1, pattern[playingBeat] === 0]}/>
		</div>
		<div class='display'>
			{#if text}
				<div  transition:fade>
					{text}
				</div>
			{/if}
		</div>
		<div class='clicks'>
			<Ripple on:click={() => setClicks(clicks+1)}></Ripple>
			<Ripple on:click={() => setClicks(clicks-1)}></Ripple>
		</div>
		<div class='bpm'>
			<Ripple on:click={() => setBpm(bpm+20)}></Ripple>
			<Ripple on:click={() => setBpm(bpm+5)}></Ripple>
			<Ripple on:click={() => setBpm(bpm+1)}></Ripple>
			<Ripple on:click={() => setBpm(bpm-1)}></Ripple>
			<Ripple on:click={() => setBpm(bpm-5)}></Ripple>
			<Ripple on:click={() => setBpm(bpm-20)}></Ripple>
		</div>		
	</Layout>
	<Topbar {visible}>
		<div slot=content>
			<Slider bind:value={bpm} min=40 max=360 step=10 style='width:80vw'/>
		</div>
	</Topbar>
	<Bottombar {visible} on:click={() => {}}>
		<PlayButton on:click={() => {playing = !playing}}>{ playing ? 'PAUSE' : 'PLAY'}</PlayButton>
	</Bottombar>
	<Beats bind:pattern activeId={playingBeat}/>
{/if}
