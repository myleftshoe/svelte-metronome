<style>
    .container { 
        display: flex;
        height:50vh;
        width:100vw;
        transition: all .3s ease;
        flex-basis:100%;
    }
    .hidden {
        flex-basis:0;
    }
    .keypad { 
        display: grid;
        height:100%;
        width:100%;
        grid-gap: 5px;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }
    button {
        background-color: #333;
        border: none;
        outline:none;
        cursor: pointer;
        color:white;
        font-size:4vh;
        display:flex;
        align-items:center;
        justify-content:center;
    }
    button:active {
        background-color: #777;
    }
    #onbeat { 
        grid-row:1/3; 
        grid-column:1/3; 
    }
    #offbeat { 
        grid-row:1/3; 
        grid-column:3/5; 
    }
    #playpause {
        grid-row:3/5;
        grid-column:1/3;
    }
</style>
<script>
    export let visible = false;
    export let playing = false;

    import { ClearIcon, VerticalBarIcon, PlayIcon,  PauseIcon } from '../svgicons';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function handleKeypress(e) {
        const key = e.target.id || e.target.innerText;
        dispatch('keypress', key);
    }
</script>
<div class=container class:hidden={!visible}>
    <div class='keypad' on:click={handleKeypress}>
        <button id='onbeat'><VerticalBarIcon size={32}/></button>
        <button id='offbeat'><VerticalBarIcon size={16}/></button>
        <button id='backspace'><ClearIcon/></button>
        <button id='delete'>X</button>
        <button id='playpause'>
            {#if playing}
                <PauseIcon/>
            {:else}
                <PlayIcon/>
            {/if}
        </button>
        <button>+20</button>
        <button>+1</button>
        <button>+</button>
        <button>-20</button>
        <button>-1</button>
        <button>-</button>
    </div>
</div>