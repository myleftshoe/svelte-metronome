
<script>
	import { onMount } from 'svelte';
	import Theme from './theme.svelte'
	import Layout from './layout.svelte';
	import { BeatsControl, PlayButton, Beats, Underlay, Bottombar, ClicksControl, BpmControl, Notifier } from './components';
	import metronome from './metronome';

	let bpm = 200;
	let clicks = 0;
	let playing = true;
	let previous = false;
	let pattern = [];
	let mounted = false;
	let playingBeat;
	let visible = false;
	let message = '';

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

	function notify(value) {
		message = value;
	} 

</script>

<svelte:window 
	on:contextmenu|preventDefault
/>
<svelte:body 
	on:keydown={handleKeydown}
	on:wheel={handleWheel}
/>

{#if mounted}
	<Underlay on:click={() => visible = !visible}/>
	<Beats bind:pattern activeId={playingBeat}/>
	{#if message}
		<Notifier bind:message/>
	{/if}
	<Layout>
		<BeatsControl bind:pattern active={[pattern[playingBeat] === 1, pattern[playingBeat] === 0]}/>
		<BpmControl bind:bpm on:click={e => notify(`${e.detail} bpm`)}/>
		<ClicksControl bind:clicks on:click={e => notify(`${e.detail} clicks`)}/>
	</Layout>
	<Bottombar {visible} on:click={() => {}}>
		<PlayButton on:click={() => {playing = !playing}}>{ playing ? 'PAUSE' : 'PLAY'}</PlayButton>
	</Bottombar>
{/if}
