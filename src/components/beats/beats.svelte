<style>
    .container { 
        position:fixed;
        top:0;
        left:0;
        background-color: #232323;
        display:grid;
        grid-auto-flow: column;
        grid-template-columns: minmax(5vw, 1fr) auto 1fr;
        width:100%;
        justify-content:space-between;
        align-items:center; 
        box-shadow: 0px 0px 8px 8px #0003;
        border-bottom: 1px solid #121212;
    }
    .pattern { 
        /* background-color: pink; */
        display:flex;
        justify-content:center;
        align-items:center; 
        transition:all .5s ease;
        overflow-x:auto;
        max-width:100%;
        height:10vh;
        overflow-y: hidden;
        padding: 5px;
    }
    .hotspot { 
        width:100%; 
        height:100%;
        display:flex;
        align-items:center;
        justify-content:flex-end;
        cursor: pointer;
    }
</style>

<script>
    export let pattern = [];
    export let activeId;
    import {slide, fade} from 'svelte/transition'; 
    import Bar from './bar.svelte';
    import { ClearIcon } from '../../svgicons';
    import Hotspot from '../hotspot.svelte';
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
        <!-- <Hotspot ripple on:click={removeOne}/> -->
        <div class=hotspot on:click={removeOne}/>
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
