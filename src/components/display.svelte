<style>
    .container { 
        display:flex;
        justify-content:center;
        align-items:center; 
        width:100%;
        height:100%;
    }
    .pattern { 
        display:flex;
        justify-content:center;
        align-items:center; 
        max-width:100%;
        height:50%;
        overflow-x:auto;
        overflow-y: hidden;
        /* transition:all .5s ease; */
    }
</style>

<script>
    export let pattern = [];

    import {slide, fade} from 'svelte/transition'; 
    import Bar from './bar.svelte';
    
    function toggleBar(index) {
        pattern[index] = !pattern[index];
        pattern=[...pattern];
    }

</script>

<div class='container' on:click>
    <div class=pattern>
        {#each pattern as big, id}
            <Bar {id} {big} on:click={() => toggleBar(id)}/>
        {/each}
    </div>
</div>
