<style>
	div {
		position:fixed;
		top:10vh;
		height:20vh;
		left:10vw;
		right:10vw;
		/* background-color: #0003; */
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
