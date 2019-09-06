<style>
	.container {
		display: flex;
		flex-direction: column;
		width:100vw;
		height:100vh;
	}
</style>

<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Display, Keypad, Notifier } from './components';
	import metronome from './metronome';

	let bpm = 200;
	let clicks = 0;
	let playing = true;
	let previous = false;
	let pattern = [1,0,0,0];
	let mounted = false;
	let keypadVisible = true;
	let message = '';
	let show = false;
	let left;
	let right;

	onMount(() => {
		mounted = true;
	});

	function toggleClass(node, name, duration = 50) {
		node.classList.add(name);
		setTimeout(() => node.classList.remove(name), duration);
	}

	metronome.beatCallback = function(beatId) {
		const id = parseInt(beatId.split(':')[1]);
		const bar = document.getElementById(`bar-${id}`);
		toggleClass(bar, 'active');
	}

	function setBpm (value) {
		bpm = value < 40 ? 40 : value > 360 ? 360 : value;
	}

	function floor(value, amount) {
		return Math.floor(value/amount) * amount + amount;
	} 

	function ceil(value, amount) {
		return Math.ceil(value/amount) * amount - amount;
	} 

    function handleWheel(e) {
		const multiplier = e.shiftKey ? 1 : 10;
		if (Math.sign(e.deltaY) < 0)
			setBpm(floor(bpm, multiplier));
		else
			setBpm(ceil(bpm, multiplier));
    }

    function handleKeydown(e) {
		const multiplier = e.shiftKey ? 1 : 5;
		switch (e.key) {
			case 'ArrowUp': {
				setBpm(floor(bpm, multiplier)); 
				break;
			}
			case 'ArrowDown': {
				setBpm(ceil(bpm, multiplier));
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

	$: message = `${clicks} clicks`;
	$: message = `${bpm} bpm`;
	
</script>

<svelte:window on:contextmenu|preventDefault/>
<svelte:body on:keydown={handleKeydown}	on:wheel={handleWheel}/>

{#if mounted}
<div class=container transition:fade={{duration:1000}}>
	<Display bind:pattern on:click={() => keypadVisible = !keypadVisible}/>
	<Keypad visible={keypadVisible} {bpm} bind:clicks bind:pattern bind:playing on:change={e => setBpm(e.detail)}/>
	<Notifier bind:message/>
</div>
{/if}
