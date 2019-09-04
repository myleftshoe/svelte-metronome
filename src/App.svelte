<style>
	.container {
		display: grid;
		grid-template-rows: 10vh 1fr 40vh 1fr 10vh;
		grid-template-columns: 1fr 70vw 1fr;
		width:100vw;
		height:100vh;
		font-size: 1em;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Topbar, BeatsControl, BpmControl, ClicksControl, StartStop, Overlay, Notifier } from './components';
	import metronome from './metronome';

	let bpm = 200;
	let clicks = 0;
	let playing = true;
	let previous = false;
	let pattern = [];
	let mounted = false;
	let visible = false;
	let message = '';
	let show = false;
	let left;
	let right;

	onMount(() => {
		mounted = true;
	});

	metronome.beatCallback = function(beatId) {
		const id = parseInt(beatId.split(':')[1]);

		left = left || document.getElementById('left-bar');
		right = right || document.getElementById('right-bar');
		const bar = document.getElementById(`bar-${id}`);

		if (pattern[id]) {
			left.classList.add('activeselected');
			setTimeout(() => left.classList.remove('activeselected'), 50)
		}
		else {
			right.classList.add('active');
			setTimeout(() => right.classList.remove('active'), 50)
		}

		bar.classList.add('active');
		setTimeout(() => bar.classList.remove('active'), 50)
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

	$: {
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

<svelte:window on:contextmenu|preventDefault/>
<svelte:body on:keydown={handleKeydown}	on:wheel={handleWheel}/>

{#if mounted}
<div class=container transition:fade={{duration:1000}}>
	<Topbar bind:pattern/>
	<BeatsControl bind:pattern/>
	<BpmControl {show} bind:bpm on:click={e => notify(`${e.detail} bpm`)}/>
	<ClicksControl {show} bind:clicks on:click={e => notify(`${e.detail} clicks`)}/>
	<StartStop {show} bind:playing/>
	<Overlay bind:show></Overlay>
	{#if message}
		<Notifier bind:message/>
	{/if}
</div>
{/if}
