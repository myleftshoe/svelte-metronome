<style>
    .container {
        display:flex;
        flex-direction:column;
        align-items:center;
    }
</style>

<script>

	import StartStopButton from './components/start-stop-button.svelte';
	import BpmSlider from './components/bpm-slider.svelte';
	import NumericInput from './components/input-numeric.svelte';
	import createGroove from './classes/groove';
	import createBeats from './classes/beats';
	import createClicks from './classes/clicks';

	let bpm = 180;
	let beats = 12;
	let clicks = 0;
	let playing = false;
	let beatsArray = new Array(beats).fill(false);

	const clickLoop = createClicks(new Tone.Player("sounds/Low Seiko SQ50.wav").toMaster());
	const groovePart = createGroove(new Tone.Player("sounds/PK-M1.8.wav").toMaster());
	const beatPart = createBeats(new Tone.Player("sounds/SN_L-6.1.wav").toMaster());

	Tone.Transport.bpm.value = bpm;
	Tone.Transport.timeSignature = [beats,4];

	function play() {
		groovePart.update(beatsArray);
		beatPart.update(beatsArray);
		clickLoop.update(clicks);
		Tone.Transport.timeSignature = [beats,4];
		Tone.Transport.start();
	}

	function stop() {
		Tone.Transport.stop();
		Tone.Transport.cancel();
	}

	function updateBeatsArray(e) {
		beatsArray = [...beatsArray];
		beatsArray[e.target.value] = e.target.checked;
	}

	$: {
		beatsArray = [...beatsArray];
		beatsArray.length = beats;
	}

	$: { Tone.Transport.bpm.value = bpm; }

	$: {
		// block will run when of these change:
		beatsArray; beats; clicks;
		if (playing) 
			play(beats);
		else 
			stop(beats);		
	}

</script>

<div class='container'>
	<h2>Tempo</h2>
	<BpmSlider bind:value={bpm}/>
	<h2>Beats</h2>
	<NumericInput bind:value={beats} min={1} max={30}/>
	<h2>Clicks</h2>
	<NumericInput bind:value={clicks} min={0} max={9}/>
	<h2>Groove</h2>
	<div>
		{#each beatsArray as beat, i}
			<input type='checkbox' value={i} on:change={updateBeatsArray} checked={beatsArray[i]}/>
		{/each}
	</div>
	<p/>
	<StartStopButton bind:playing>
		{playing ? 'Stop' : 'Play'}
	</StartStopButton>
</div>