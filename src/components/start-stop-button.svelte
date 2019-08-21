<script>
    export let onClick;
    
</script>

<button on:click={onClick}>
    <slot/>
</button>