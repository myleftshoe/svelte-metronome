export default function createGroove(player) {

    let part = new Tone.Part();

    return {
        update(beatsArray) {
            part.removeAll();
            part.dispose();
            part = new Tone.Part(time => player.start(time));

            const times = beatsArray.reduce((res, beat, index) => {
                if (beat)
                    res.push(`0:${index}`);
                return res;
            }, []);

            times.forEach(time => part.add(time));

            part.loop=true;
            part.start('4n');
        }
    }
}

