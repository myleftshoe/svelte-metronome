<style>
    .container { 
        position:fixed;
        top:0;
        left:0;
        background-color: #000;
        display:flex;
        /* grid-auto-flow: column; */
        width:100%;
        justify-content:space-between;
        align-items:center; 
    }
    .pattern { 
        /* background-color: pink; */
        display:flex;
        justify-content:center;
        align-items:center; 
        transition:all .5s ease;
        overflow-x:auto;
        max-width:100vw;
        height:10vh;
    }
    .circle {
        background-color: #aaa7;
        height:2vh;
        width:2vh;
        border-radius: 50%;
        margin:1vh;
        flex-shrink:0;
    }
    .big {
        height:4vh;
        width:4vh;
    }
    .active {
        background-color: #ffff;
        /* box-shadow: 0px 0px 2px 4px #fff5 */
    }
    button { 
        padding:2vh;
        justify-self: end;
        border:none;
        background:none;
        /* margin-left:auto; */
        color:var(--text-color);
    }

</style>

<script>
    export let pattern = [];
    export let activeId;
    import {slide, fade} from 'svelte/transition'; 

    function handleClick(index) {
        pattern[index] = !pattern[index];
        pattern=[...pattern];
    }
</script>

{#if pattern.length } 
<div class=container in:slide out:slide={{delay:500}}>
    <div></div>
        <div class=pattern>
            {#each pattern as big, index}
                <div class=circle class:big class:active={index === activeId} transition:fade on:click={() => handleClick(index)}></div>
            {/each}
        </div>
        <button on:click={() => pattern = []} >CLEAR</button>
    </div>
{/if}
