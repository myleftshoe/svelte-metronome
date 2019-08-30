<style>
    button {
        background-color: transparent;
        /* border: 2px solid var(--primary-color); */
        border:none;
        border-radius: 12px;
        padding: .5em 1em;
        color: var(--primary-color);
        font-size:2em;
    }
</style>
<script>
    export let playing=false;
</script>

<button on:click={() => playing = !playing}>
    <slot/>
</button>