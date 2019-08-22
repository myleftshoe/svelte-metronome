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

	const onBeat = new Tone.Player("sounds/PK-M1.8.wav").toMaster();
	const offBeat = new Tone.Player("sounds/SN_L-6.1.wav").toMaster();
	const click = new Tone.Player("sounds/Low Seiko SQ50.wav").toMaster();

	Tone.Transport.bpm.value = bpm;
	Tone.Transport.timeSignature = [beats,4];

	const clickLoop = new Tone.Loop();
	let groovePart = new Tone.Part(time => onBeat.start(time));
	let beatPart = new Tone.Part(time => offBeat.start(time));


	function createGroove() {

		groovePart.removeAll();
		groovePart.dispose();
		groovePart = new Tone.Part(time => onBeat.start(time));

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

		beatPart.removeAll();
		beatPart.dispose();
		beatPart = new Tone.Part(time => offBeat.start(time));
		
		const times = beatsArray.reduce((res, beat, index) => {
			if (!beat)
				res.push(`0:${index}`);
			return res;
		}, []);

		times.forEach(time => beatPart.add(time));

		beatPart.loop=true;
		beatPart.start('4n');
	}

	function createTicks() {
		// let _clicks = `${clicks*4}n`
		if (!clicks) return;

		clickLoop.cancel();

		// const ppq = parseInt(Tone.Transport.PPQ);
		// Tone.Transport.PPQ = Math.round(ppq/clicks)*clicks;

		clickLoop.callback = time => click.start(time);
		clickLoop.interval = Tone.Time('4n')/clicks;
		clickLoop.start('4n');
	}

	function start() {
		createGroove();
		createBeats();
		createTicks();
		Tone.Transport.timeSignature = [beats,4];
		Tone.Transport.start();
	}

	function stop() {
		Tone.Transport.stop();
		Tone.Transport.cancel();
	}

	$: {
		beatsArray = [...beatsArray];
		beatsArray.length = beats;
	}

	$: { Tone.Transport.bpm.value = bpm; }

	$: {
		// Dummy references: this block will run when  
		// any of these vars change.
		beatsArray;
		beats;
		clicks;
		//
		console.log(playing, beatsArray, beats, clicks, beatPart );
		if (playing) 
			start(beats);
		else 
			stop(beats);		
	}

	function updateBeatsArray(e) {
		beatsArray = [...beatsArray];
		beatsArray[e.target.value] = e.target.checked;
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