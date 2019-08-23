export default function Part(url) {
    this.player = new Tone.Player(url).toMaster();
    this.part = new Tone.Part();
    this.times = [];
    this.play = function() {
        this.part.removeAll();
        this.part.dispose();
        this.part = new Tone.Part(time => this.player.start(time));
        this.times.forEach(time => this.part.add(time));
        this.part.loop=true;
        this.part.start('4n');
    }
}
