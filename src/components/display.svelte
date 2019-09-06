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
        width:100%;
        height:100%;
        overflow-x: auto;
        overflow-y: hidden;
        /* transition:all .5s ease; */
    }
    .justifyleft { 
        justify-content:flex-start;
    }
</style>

<script>
    export let pattern = [];

    import { afterUpdate } from 'svelte'; 
    import { fade } from 'svelte/transition'; 
    import Bar from './bar.svelte';
    import Logo from './logo.svelte';
    
    let showLogo = true;
    let node;
    let justifyleft = false;

    function toggleBar(index) {
        pattern[index] = !pattern[index];
        pattern=[...pattern];
    }

    function handleOutroEnd(e) {
        showLogo = true;
    }

    // Fixes inability to scroll left when flex justify-content = center
    afterUpdate(() => {
        if (!node) return;
        if (node.scrollWidth > node.offsetWidth) {
            node.classList.add('justifyleft');
            node.lastChild.scrollIntoView({block:'center', inline:'center', behaviour:'smooth'});
        }
        else {
            node.classList.remove('justifyleft');
        }
    });

    $: showLogo = showLogo && !pattern.length;
</script>

<div class='container' on:click>
    {#if pattern.length}
        <div bind:this={node} 
            class=pattern 
            class:justifyleft 
            transition:fade 
            on:outroend={handleOutroEnd}
        >
            {#each pattern as big, id}
                <Bar {id} {big} on:click={() => toggleBar(id)}/>
            {/each}
        </div>
    {:else if showLogo}
        <Logo on/>
    {/if}
</div>
