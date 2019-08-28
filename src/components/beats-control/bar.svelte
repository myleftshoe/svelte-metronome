<style>
    button {
        margin:2px;
        padding:0;
        border-radius: 2px;
        border: 1px solid var(--secondary-color);
        flex:1;
        height:70px;
        background-color: transparent;
    }
    .selected {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
    }
    .active {
        background-color: white;
        border-color: white;
    }
</style>

<script>
    export let id;
    export let selected = false;
    export let active = false;
</script>

<button {id} class:selected={selected} class:active={active} on:click/>
