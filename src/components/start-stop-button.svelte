<script>
    export let playing=false;
</script>

<button on:click={() => playing = !playing}>
    <slot/>
</button>