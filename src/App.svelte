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
	import { Mute, Topbar, BeatsControl, BpmControl, ClicksControl, StartStop, Overlay, Notifier } from './components';
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

	function toggleClass(node, name, duration = 50) {
		node.classList.add(name);
		setTimeout(() => node.classList.remove(name), duration);
	}

	metronome.beatCallback = function(beatId) {
		const id = parseInt(beatId.split(':')[1]);

		left = left || document.getElementById('left-bar');
		right = right || document.getElementById('right-bar');
		const bar = document.getElementById(`bar-${id}`);

		if (pattern[id]) 
			toggleClass(left, 'activeselected');
		else
			toggleClass(right, 'active');

		toggleClass(bar, 'active');
	}

	function setBpm (value) {
		bpm = value < 40 ? 40 : value > 360 ? 360 : value;
		notify(`${bpm} bpm`);
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

	function notify(value) {
		message = value;
	} 

</script>

<svelte:window on:contextmenu|preventDefault/>
<svelte:body on:keydown={handleKeydown}	on:wheel={handleWheel}/>

{#if mounted}
<div class=container transition:fade={{duration:1000}}>
	<!-- <Topbar bind:pattern/> -->
	<BeatsControl bind:pattern/>
	<BpmControl {show} {bpm} on:change={e => setBpm(e.detail)}/>
	<ClicksControl {show} bind:clicks on:click={e => notify(`${e.detail} clicks`)}/>
	<StartStop {show} bind:playing/>
	<Overlay bind:show></Overlay>
	<Mute bind:pattern/>
	{#if message}
		<Notifier bind:message/>
	{/if}
</div>
{/if}
