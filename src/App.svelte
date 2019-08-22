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

	let bpm = 180;
	let beats = 12;
	let clicks = 0;
	let playing = false;
	let beatsArray = new Array(beats).fill(false);

	const players = {
		clicks: new Tone.Player("sounds/Low Seiko SQ50.wav").toMaster(),
		groove: new Tone.Player("sounds/PK-M1.8.wav").toMaster(),
		beats: new Tone.Player("sounds/SN_L-6.1.wav").toMaster(),
	}

	let groovePart = new Tone.Part();
	let beatsPart = new Tone.Part();
	let clickLoop = new Tone.Loop();

	Tone.Transport.bpm.value = bpm;
	Tone.Transport.timeSignature = [beats,4];

	function createGroove() {
		groovePart.removeAll();
		groovePart.dispose();
		groovePart = new Tone.Part(time => players.groove.start(time));

		const times = beatsArray.reduce((res, beat, index) => {
			if (beat)
				res.push(`0:${index}`);
			return res;
		}, []);

		times.forEach(time => groovePart.add(time));

		groovePart.loop=true;
		groovePart.start('4n');
	}

	function createBeats() {
		beatsPart.removeAll();
		beatsPart.dispose();
		beatsPart = new Tone.Part(time => players.beats.start(time));

		const times = beatsArray.reduce((res, beat, index) => {
			if (!beat)
				res.push(`0:${index}`);
			return res;
		}, []);

		times.forEach(time => beatsPart.add(time));

		beatsPart.loop=true;
		beatsPart.start('4n');
	}

	function createClicks() {
		if (!clicks) return;
		clickLoop.cancel();
		clickLoop.callback = time => players.clicks.start(time);
		clickLoop.interval = Tone.Time('4n')/clicks;
		clickLoop.start('4n');
	}

	function play() {
		createGroove();
		createBeats();
		createClicks();
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
			stop();		
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