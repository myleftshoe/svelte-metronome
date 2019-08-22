export default function createTicks(player) {

	let loop = new Tone.Loop();

    return {
        update(clicks) {
            if (!clicks) return;
            loop.cancel();
            loop.callback = time => player.start(time);
            loop.interval = Tone.Time('4n')/clicks;
            loop.start('4n');
        }
    }
}

