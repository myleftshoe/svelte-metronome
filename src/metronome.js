export default {

    ready: false,

    get isReady() {
        if (!window.Tone) return false;
        if (this.ready) return true; 
        this.onBeats = new Part("sounds/PK-M1.8.wav");
        this.offBeats = new Part('sounds/SN_L-6.1.wav');
        this.clicksLoop = new Loop('sounds/Low Seiko SQ50.wav');
        return true;
    },

    play(bpm, beatsArray, clicks) {
        if (!this.isReady) return; 
        const beats = beatsArray.length;
        Tone.Transport.bpm.value = bpm; 
        Tone.Transport.timeSignature = [beats,4];
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
        // this.stop();
        this.onBeats.play(onTimes);
        this.offBeats.play(offTimes);
        this.clicksLoop.play(clicks);
        Tone.Transport.start();
    },
    stop() {
        if (!this.isReady) return; 
        Tone.Transport.stop();
        Tone.Transport.cancel();
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

