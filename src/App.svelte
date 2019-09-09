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
	let playing = false;
	let previous = false;
	let pattern = [1,0,0,0];
	let mounted = false;
	let keypadVisible = true;
	let message = '';

	onMount(() => { mounted = true;});

	function toggleClass(node, name, duration = 100) {
		node.classList.add(name);
		setTimeout(() => node.classList.remove(name), duration);
	}

	metronome.beatCallback = function(beatId) {
		const id = parseInt(beatId.split(':')[1]);
		const bar = document.getElementById(`bar-${id}`);
		bar.scrollIntoView({block:'center', inline:'center', behaviour:'smooth'});
		toggleClass(bar, 'active');
	}

	function setBpm (value) {
		bpm = value < 40 ? 40 : value > 360 ? 360 : value;
	}

	const floor = (value, amount) => Math.floor(value/amount) * amount + amount; 
	const ceil = (value, amount) => Math.ceil(value/amount) * amount - amount;

    function handleWheel(e) {
		const multiplier = e.shiftKey ? 1 : 10;
		if (Math.sign(e.deltaY) < 0)
			setBpm(floor(bpm, multiplier));
		else
			setBpm(ceil(bpm, multiplier));
    }

    function handleKeydown(e) {
		const multiplier = e.shiftKey ? 1 : 5;
		const keyActions = {
			' ' : () => playing = !playing,
			'ArrowUp' : () => setBpm(floor(bpm, multiplier)),
			'ArrowDown': () => setBpm(ceil(bpm, multiplier)),
			'ArrowRight': () => {pattern = [...pattern, 0]},
			'ArrowLeft': () => {pattern = [...pattern, 1]},
			'Delete' : () => {pattern=[];},
			'Backspace' : () => {
				pattern.pop();
				pattern = [...pattern];
			},
		}
		keyActions[e.key] && keyActions[e.key]();
    }

	function handleDisplayClick() {
		if (!pattern.length)
			keypadVisible = true;
		else {
			keypadVisible = !keypadVisible;
			if (!keypadVisible && !playing)
				playing = true; 
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
		<Display bind:pattern on:click={handleDisplayClick}/>
		<Keypad visible={keypadVisible} {bpm} bind:clicks bind:pattern bind:playing on:change={e => setBpm(e.detail)}/>
		<Notifier bind:message/>
	</div>
{/if}
