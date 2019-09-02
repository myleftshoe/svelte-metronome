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
        overflow-y: hidden;
    }
    button { 
        padding:2vh;
        justify-self: end;
        border:none;
        background:none;
        /* margin-left:auto; */
        color:var(--text-color);
        cursor:pointer;
    }
</style>

<script>
    export let pattern = [];
    export let activeId;
    import {slide, fade} from 'svelte/transition'; 
    import Bar from './bar.svelte';

    function handleClick(index) {
        pattern[index] = !pattern[index];
        pattern=[...pattern];
    }
</script>

{#if pattern.length } 
    <div id='beats-container' class='container' in:slide out:slide={{delay:500}}>
        <div></div>
        <div class=pattern>
            {#each pattern as big, id}
                <Bar {big} active={id === activeId} on:click={() => handleClick(id)}></Bar>
            {/each}
        </div>
        <button on:click={() => pattern = []} >CLEAR</button>
    </div>
{/if}
