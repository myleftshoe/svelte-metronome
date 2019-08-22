export default {
    player: new Tone.Player("sounds/Low Seiko SQ50.wav").toMaster(),
    loop: new Tone.Loop(),
    run(clicks) {
		this.loop.cancel();
		if (!clicks) return;
		this.loop.callback = time => this.player.start(time);
		this.loop.interval = Tone.Time('4n')/clicks;
		this.loop.start('4n');
    }
}
