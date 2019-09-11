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

	const actions = {
		addOnBeat() {
			pattern = [...pattern, 1];
		},
		addOffBeat() {
			pattern = [...pattern, 0];
		},
		removeOne() {
			pattern.pop();
			pattern=[...pattern];
		},
		clearAll() {
			pattern = [];
		},
		togglePlaying() {
			playing = !playing;
		},
		setBpm(value) {
			bpm = value < 40 ? 40 : value > 360 ? 360 : value;
		},
		setClicks(value) {
			clicks = value < 0 ? 0 : value > 9 ? 9 : value;
		},
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
			'ArrowUp': actions.addOnBeat,
			'ArrowDown': actions.addOffBeat,
			'Backspace': actions.removeOne,
			'Delete': actions.clearAll,
			' ': actions.togglePlaying,
			'PageUp' : () => actions.setBpm(floor(bpm, multiplier)),
			'PageDown': () => actions.setBpm(ceil(bpm, multiplier)),
			'ArrowLeft': () => actions.setClicks(clicks-1),
			'ArrowRight' : () => actions.setClicks(clicks+1),
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

	function handleKeypad(e) {
		console.log(e);
		const keyActions = {
			'onbeat': actions.addOnBeat,
			'offbeat': actions.addOffBeat,
			'backspace': actions.removeOne,
			'delete': actions.clearAll,
			'playpause': actions.togglePlaying,
			'+': () => actions.setClicks(clicks+1),  
			'-': () => actions.setClicks(clicks-1),
			'+20': () => actions.setBpm(bpm+20),
			'-20': () => actions.setBpm(bpm-20),
			'+1': () => actions.setBpm(bpm+1),
			'-1': () => actions.setBpm(bpm-1),
		}
		keyActions[e.detail]();

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
		<Keypad visible={keypadVisible} on:keypress={handleKeypad}/>
		<Notifier bind:message/>
	</div>
{/if}
