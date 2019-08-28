// import Tone from 'tone'
import Tone from 'tone/Tone/core/Tone';
import ToneTransport from 'tone/Tone/core/Transport';
import TonePart from 'tone/Tone/event/Part';
import ToneLoop from 'tone/Tone/event/Loop';
import TonePlayer from 'tone/Tone/source/Player';
import ToneTime from 'tone/Tone/type/Time';
import ToneDraw from 'tone/Tone/core/Draw';

export default {

    init() {
        if (!this.initialized) {
            this.initialized = true;
            Tone.context.resume();
            this.onBeats = new Part("sounds/PK-M1.8.wav", this.beatCallback);
            this.offBeats = new Part('sounds/SN_L-6.1.wav' , this.beatCallback);
            this.clicksLoop = new Loop('sounds/Low Seiko SQ50.wav');
        }
    },
    play(bpm, beatsArray, clicks) {
        this.init()
        const beats = beatsArray.length;
        ToneTransport.bpm.value = bpm; 
        ToneTransport.timeSignature = [beats,4];
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
        this.onBeats.play(onTimes, this.beatCallback);
        this.offBeats.play(offTimes);
        this.clicksLoop.play(clicks);
        ToneTransport.start();
    },
    stop() {
        ToneTransport.stop();
        ToneTransport.cancel();
    },
}

function Part(url, callback) {
    this.player = new TonePlayer(url).toMaster();
    this.part = new TonePart();
    this.setUrl = (url) => {this.player = new TonePlayer(url).toMaster()};
    this.play = function(times) {
        this.part.removeAll();
        this.part.dispose();
        this.part = new TonePart((time, id) => {
            callback && Tone.Draw.schedule(() => callback(id), time);
            this.player.start(time)
        });
        times.forEach(time => this.part.add(time, time));
        this.part.loop=true;
        this.part.start('4n');
    }
}

function Loop(url) {
    this.player = new TonePlayer(url).toMaster();
    this.loop = new ToneLoop();
    this.setUrl = (url) => {this.player = new TonePlayer(url).toMaster()};
    this.play = function(clicks) {
        this.loop.cancel();
        if (!clicks) return;
        this.loop.interval = ToneTime('4n')/clicks;
        this.loop.callback = time => this.player.start(time);
        this.loop.start('4n');
    }
}

