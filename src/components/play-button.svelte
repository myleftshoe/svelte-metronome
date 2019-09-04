<style>
    button {
        background: none;
        border:none;
        outline:none;
        padding: .5em 2em;
        color: cyan;
        font-size:1em;
        cursor: pointer;
        height:100%;
        width:100%;
        display:flex;
        justify-content: center;
        align-items:center;
        font-weight: bold;
        text-transform: uppercase; 
    }
</style>
<script>
    import Hotspot from './hotspot.svelte';
    let pressed = false;
    function handlePointerDown() {
        pressed = true;
    }
    function handlePointerUp() {
        pressed = false;
    }
</script>
<Hotspot>
    <button 
        on:click
        on:pointerdown={handlePointerDown}
        on:pointerup={handlePointerUp}
        on:contextmenu|preventDefault={() => {}}
    >
        <slot/>
    </button>
</Hotspot>
