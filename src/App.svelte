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
	import Beats from './components/input-numeric.svelte';
	import Clicks from './components/input-numeric.svelte';

	let bpm = 180;
	let beats = 12;
	let clicks = 0;
	let playing = false;
	let beatsArray = new Array(beats).fill(false);

	const onBeat = new Tone.Player("kick.wav").toMaster();
	const offBeat = new Tone.Player("High Seiko SQ50.wav").toMaster();
	const click = new Tone.Player("Low Seiko SQ50.wav").toMaster();


	Tone.Transport.bpm.value = bpm;
	Tone.Transport.timeSignature = [beats,4];
	// Tone.Transport.PPQ = 189;
	// Tone.context.latencyHint = 'fastest'
	// Tone.context.lookAhead = 0;


	function createGroove() {

		const times = beatsArray.reduce((res, beat, index) => {
			if (beat)
				res.push(`0:${index}`);
			return res;
		}, []);

		const part = new Tone.Part(time => onBeat.start(time));
		times.forEach(time => part.add(time));

		part.loop=true;
		part.start(0);

	}

	function createBeats() {

		const times = beatsArray.reduce((res, beat, index) => {
			if (!beat)
				res.push(`0:${index}`);
			return res;
		}, []);

		const part = new Tone.Part(time => offBeat.start(time));
		times.forEach(time => part.add(time));

		part.loop=true;
		part.start(0);

	}

	function createTicks() {
		// let _clicks = `${clicks*4}n`
		if (clicks === 5)
			Tone.Transport.PPQ = 190;
		else if (clicks === 7)
			Tone.Transport.PPQ = 189;
		else
			Tone.Transport.PPQ = 192;

		const loop = new Tone.Loop();

		let _clicks = Tone.Time('4n')/clicks;
		console.log(_clicks)
		loop.callback = time => click.start(time);
		loop.interval = _clicks;
		loop.start(0);
	}

	function start() {
		createGroove();
		createBeats();
		createTicks();
		Tone.Transport.start();
	}

	function stop() {
		Tone.Transport.stop();
	}

	function toggle() {
		playing=!playing;
		if (playing) 
			start();
		else 
			stop();
	}

	function setBpm(value){
		// Tone.Transport.bpm.rampTo(value, 5);
		bpm = value;
		Tone.Transport.bpm.value = bpm; 
	}

	function setBeats(value) {
		beats = value;
		beatsArray = new Array(beats).fill(false);
		Tone.Transport.timeSignature = [beats,4];
	}

	function setClicks(value) {
		clicks = value;
	}

	function toggleCheckbox(e) {
		const i = parseInt(e.target.value);
		const checked = e.target.checked; 
		beatsArray[i] = checked;
	}

</script>

<div class='container'>
	<h2>Tempo</h2>
	<BpmSlider onChange={setBpm} {bpm}/>
	<h2>Beats</h2>
	<Beats onChange={setBeats} value={beats} min={1} max={30}/>
	<h2>Clicks</h2>
	<Clicks onChange={setClicks} value={clicks} min={0} max={7}/>
	<h2>Groove</h2>
	<div>
		{#each beatsArray as beat, i}
			<input type='checkbox' value={i} on:click={toggleCheckbox} checked={beat}/>
		{/each}
	</div>
	<p/>
	<StartStopButton onClick={toggle}>
		{playing ? 'Stop' : 'Play'}
	</StartStopButton>
</div>