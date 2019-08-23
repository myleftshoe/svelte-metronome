<script>

    export let value = 160;

    const min = 40;
    const max = 320;
    
    function crement(e) {
        value = value + parseInt(e.target.innerText);
        if (value < min)
            value = min;
        if (value > max)
            value = max;
    }

    function round(e) {
        value = Math.round(value/10) * 10
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
    <input type="range" style="width:100%" min={min} max={max} step="1" bind:value/>
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