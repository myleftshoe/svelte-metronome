export default {
    player: new Tone.Player("sounds/PK-M1.8.wav").toMaster(),
    part: new Tone.Part(),
    run(beatsArray) {
        this.part.removeAll();
        this.part.dispose();
        this.part = new Tone.Part(time => this.player.start(time));

        const times = beatsArray.reduce((res, beat, index) => {
            if (beat)
                res.push(`0:${index}`);
            return res;
        }, []);

        times.forEach(time => this.part.add(time));

        this.part.loop=true;
        this.part.start('4n');
    }
}
