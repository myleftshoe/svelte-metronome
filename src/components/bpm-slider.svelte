<script>
    export let onChange;
    export let bpm = 160;

    const min = 40;
    const max = 320;
    
    function handleSlide(e) {
        bpm = parseInt(e.target.value);
    }

    function handleChange(e) {
        onChange(parseInt(e.target.value));
    }

    function crement(e) {
        bpm = bpm + parseInt(e.target.innerText);
        if (bpm < min)
            bpm = min;
        if (bpm > max)
            bpm = max;
        onChange(bpm);
    }

    function round(e) {
        console.log(bpm);
        bpm = Math.round(bpm/10) * 10
    }

</script>

<style>
    .container {
        display:flex;
        flex-direction:column;
        align-items:center;
    }
</style>

<div class='container'>
    <input type="range" style="width:100%" min={min} max={max} step="1" value={bpm} 
        on:input={handleSlide}
        on:change={handleChange}
    />
    <div>{bpm}</div>
    <div class='buttons'>
        <button on:click={crement}>-20</button>
        <button on:click={crement}>-5</button>
        <button on:click={crement}>-1</button>
        <button on:click={round}>0</button>
        <button on:click={crement}>+1</button>
        <button on:click={crement}>+5</button>
        <button on:click={crement}>+20</button>
    </div>

</div>