export default {
    onBeats: new Part("sounds/PK-M1.8.wav"),
    offBeats: new Part('sounds/SN_L-6.1.wav'),
    clicksLoop: new Loop('sounds/Low Seiko SQ50.wav'),
    onTimes: [],
    offTimes: [],
    bpm: 120,
    beats: 4,
    init(bpm, beats) {
        Tone.Transport.bpm.value = bpm;
        Tone.Transport.timeSignature = [beats,4];
        this.beats = beats;
    },
    play(beatsArray, clicks) {
    this.beats = beatsArray.length;
    const onTimes = beatsArray.reduce((res, beat, index) => {
        if (beat)
            res.push(`0:${index}`);
        return res;
    }, []);
    const offTimes = beatsArray.reduce((res, beat, index) => {
        if (!beat)
            res.push(`0:${index}`);
        return res;
    }, []);
    Tone.Transport.timeSignature = [this.beats,4];
    // this.stop();
    this.onBeats.play(onTimes);
    this.offBeats.play(offTimes);
    this.clicksLoop.play(clicks);
    Tone.Transport.start();
    },
    stop() {
        Tone.Transport.stop();
        Tone.Transport.cancel();
    },
    set bpm(bpm) { 
        Tone.Transport.bpm.value = bpm; 
    },
}

function Part(url) {
    this.player = new Tone.Player(url).toMaster();
    this.part = new Tone.Part();
    this.setUrl = (url) => {this.player = new Tone.Player(url).toMaster()};
    this.play = function(times) {
        this.part.removeAll();
        this.part.dispose();
        this.part = new Tone.Part(time => this.player.start(time));
        times.forEach(time => this.part.add(time));
        this.part.loop=true;
        this.part.start('4n');
    }
}

function Loop(url) {
    this.player = new Tone.Player(url).toMaster();
    this.loop = new Tone.Loop();
    this.setUrl = (url) => {this.player = new Tone.Player(url).toMaster()};
    this.play = function(clicks) {
        this.loop.cancel();
    if (!clicks) return;
        this.loop.interval = Tone.Time('4n')/clicks;
    this.loop.callback = time => this.player.start(time);
    this.loop.start('4n');
    }
}

