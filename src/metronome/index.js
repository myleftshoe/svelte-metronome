import groovePart from './groove';
import beatsPart from './beats';
import clicksPart from './clicks';

export default {
    init(bpm, beats) {
        Tone.Transport.bpm.value = bpm;
        Tone.Transport.timeSignature = [beats,4];
    },
    play(beatsArray, clicks) {
		groovePart.run(beatsArray);
		beatsPart.run(beatsArray);
        clicksPart.run(clicks);
        Tone.Transport.timeSignature = [beatsArray.length,4];
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