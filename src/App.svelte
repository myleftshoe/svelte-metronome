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

	import metronome from './metronome';

	let bpm = 180;
	let beats = 12;
	let clicks = 0;
	let playing = false;
	let beatsArray = new Array(beats).fill(false);

	metronome.init(bpm, beats);

	function updateBeatsArray(e) {
		beatsArray = [...beatsArray];
		beatsArray[e.target.value] = e.target.checked;
	}

	$: metronome.bpm = bpm;

	$: {
		beatsArray = [...beatsArray];
		beatsArray.length = beats || 1;
		if (playing)
			metronome.play(beatsArray, clicks);
		else 
			metronome.stop();		
	}

</script>

<div class='container'>
	<h2>{bpm}</h2>
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