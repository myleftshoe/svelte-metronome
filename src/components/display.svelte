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
        height:100%;
        overflow-x: auto;
        overflow-y: hidden;
        /* transition:all .5s ease; */
    }
</style>

<script>
    export let pattern = [];

    import { fade } from 'svelte/transition'; 
    import Bar from './bar.svelte';
    import Logo from './logo.svelte';
    
    let showLogo = true;
    function toggleBar(index) {
        pattern[index] = !pattern[index];
        pattern=[...pattern];
    }

    function handleOutroEnd(e) {
        showLogo = true;
    }

    $: showLogo = showLogo && !pattern.length;
</script>

<div class='container' on:click>
    {#if pattern.length}
        <div class=pattern transition:fade on:outroend={handleOutroEnd}>
            {#each pattern as big, id}
                <Bar {id} {big} on:click={() => toggleBar(id)}/>
            {/each}
        </div>
    {:else if showLogo}
        <Logo on/>
    {/if}
</div>
