<style>
	div {
		grid-column: 2;
		grid-row: 2;
		display:flex;
		align-items:center;
		justify-content: center;
		font-size:7vh;
		color:#fff3;
		text-shadow: .5vh .5vh 1vh #0008;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
	}
</style>
<script>
    export let text = '';
    import {fade} from 'svelte/transition';
</script>
<div>
    {#if text}
        <div  transition:fade>
            {text}
        </div>
    {/if}
</div>
