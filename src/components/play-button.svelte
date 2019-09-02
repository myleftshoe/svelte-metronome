<style>
    button {
        /* background: url('button.png'); */
        background: none;
        /* border: 2px solid var(--primary-color); */
        border:none;
        outline:none;
        /* padding: .5em 1em; */
        color: var(--text-color);
        font-size:1em;
        cursor: pointer;
        height:100%;
        width:100%;
    }
    .pressed {
        /* background-size: 32px 32px; */
        transform: scale(.98); 
    }
</style>
<script>
    let pressed = false;
    function handlePointerDown() {
        pressed = true;
    }
    function handlePointerUp() {
        pressed = false;
    }
</script>
<button 
    class:pressed
    on:click
    on:pointerdown={handlePointerDown}
    on:pointerup={handlePointerUp}
    on:contextmenu|preventDefault={() => {}}
>
    <slot/>
</button>
