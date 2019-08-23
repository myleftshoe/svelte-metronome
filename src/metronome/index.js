// import groovePart from './groove';
import clicksLoop from './clicks';
import Part from './part';

export default {
    onBeats: new Part("sounds/PK-M1.8.wav"),
    offBeats: new Part('sounds/SN_L-6.1.wav'),
    onTimes: [],
    offTimes: [],
    beats: 4,
    init(bpm, beats) {
        Tone.Transport.bpm.value = bpm;
        this.beats = 4;
        Tone.Transport.timeSignature = [this.beats,4];
    },
    set times(beatsArray) {
      this.beats = beatsArray.length;
      this.onTimes = beatsArray.reduce((res, beat, index) => {
        if (beat)
            res.push(`0:${index}`);
        return res;
      }, []);
      this.offTimes = beatsArray.reduce((res, beat, index) => {
        if (!beat)
            res.push(`0:${index}`);
        return res;
      }, []);
    },
    play(clicks) {
      this.onBeats.times = this.onTimes;
      this.onBeats.play();
      this.offBeats.times = this.offTimes;
      this.offBeats.play();
      clicksLoop.run(clicks);
      Tone.Transport.timeSignature = [this.beats,4];
      Tone.Transport.start();
    },
    stop() {
		Tone.Transport.stop();
		Tone.Transport.cancel();
    },
    setBpm(bpm) { 
        Tone.Transport.bpm.value = bpm; 
    }
}