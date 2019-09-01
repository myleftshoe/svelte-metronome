<style>
    .container {
        border-radius: 12px;
        box-shadow: 
            0px 0px 2px 4px black,   
            0px 0px 5px 5px #555a; 
    }
    button {
        background: url('button.png');
        /* background-color:  transparent; */
        /* border: 2px solid var(--primary-color); */
        border:none;
        outline:none;
        /* padding: .5em 1em; */
        /* color: var(--primary-color); */
        font-size:1em;
        cursor: pointer;
        height:64px;
        width:64px;
    }
    .pressed {
        /* background-size: 32px 32px; */
        transform: scale(.98); 
    }
</style>
<script>
    export let playing=false;
    let pressed = false;
    function handlePointerDown() {
        console.log('fsdfs')
        pressed = true;
    }
    function handlePointerUp() {
        pressed = false;
    }
</script>

<div class=container>
    <button 
        class:pressed
        on:click={() => playing = !playing}
        on:pointerdown={handlePointerDown}
        on:pointerup={handlePointerUp}
        on:contextmenu|preventDefault={() => {}}
    >
        <!-- <slot/> -->
    </button>
</div>