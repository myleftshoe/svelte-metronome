<script>
    import Incrementor from './incrementor.svelte'
    export let value = 10;
    export let min = 0;
    export let max = 10;
</script>

<div>
    <input type='number' min={min} max={max} bind:value on:input={handleInput}/>
    <Incrementor bind:value/>
</div>


