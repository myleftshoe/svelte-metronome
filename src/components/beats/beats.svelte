<style>
    .container { 
        position:fixed;
        top:0;
        left:0;
        background-color: #000;
        display:grid;
        grid-auto-flow: column;
        grid-template-columns: 1fr auto 1fr;
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
    .hotspot { 
        width:100%; 
        height:100%;
        display:flex;
        align-items:center;
        justify-content:flex-end;
    }
</style>

<script>
    export let pattern = [];
    export let activeId;
    import {slide, fade} from 'svelte/transition'; 
    import Bar from './bar.svelte';
    import { ClearIcon } from '../../svgicons';

    function handleClick(index) {
        pattern[index] = !pattern[index];
        pattern=[...pattern];
    }
    function removeOne() {
        pattern.pop();
        pattern=[...pattern];
    }
    function addOne() {
        pattern=[...pattern, 0];
    }
</script>

{#if pattern.length } 
    <div id='beats-container' class='container' in:slide out:slide={{delay:500}}>
        <div class=hotspot on:click={removeOne}></div>
        <div class=pattern>
            {#each pattern as big, id}
                <Bar {big} active={id === activeId} on:click={() => handleClick(id)}></Bar>
            {/each}
        </div>
        <div class=hotspot on:click={addOne}>
            <div on:click|stopPropagation={() => pattern = []}>
                <ClearIcon size='1em' color='#fffa'/>
            </div>
        </div>
    </div>
{/if}
