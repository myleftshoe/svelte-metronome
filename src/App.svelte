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

	// const onBeat = new Tone.Player("kick.wav").toMaster();
	// const offBeat = new Tone.Player("High Seiko SQ50.wav").toMaster();
	// const click = new Tone.Player("sounds/Low Seiko SQ50.wav").toMaster();

	const onBeat = new Tone.Player("sounds/PK-M1.8.wav").toMaster();
	const offBeat = new Tone.Player("sounds/SN_L-6.1.wav").toMaster();
	const click = new Tone.Player("sounds/Low Seiko SQ50.wav").toMaster();

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
		if (!clicks) return;

		const ppq = parseInt(Tone.Transport.PPQ);
		Tone.Transport.PPQ = Math.round(ppq/clicks)*clicks;

		const loop = new Tone.Loop();
		loop.callback = time => click.start(time);
		loop.interval = Tone.Time('4n')/clicks;
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
		Tone.Transport.cancel();
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

</script>

<div class='container'>
	<h2>Tempo</h2>
	<BpmSlider onChange={setBpm} {bpm}/>
	<h2>Beats</h2>
	<NumericInput onChange={setBeats} value={beats} min={1} max={30}/>
	<h2>Clicks</h2>
	<NumericInput onChange={setClicks} value={clicks} min={0} max={9}/>
	<h2>Groove</h2>
	<div>
		{#each beatsArray as beat, i}
			<input type='checkbox' value={i} bind:checked={beat}/>
		{/each}
	</div>
	<p/>
	<StartStopButton onClick={toggle}>
		{playing ? 'Stop' : 'Play'}
	</StartStopButton>
</div>