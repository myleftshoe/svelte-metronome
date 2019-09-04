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
		color:#fff5;
		text-shadow: .5vh .5vh 1vh #0008;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
	}
</style>
<script>
	export let message = '';
	import {fade} from 'svelte/transition';
	let timeout;
	$: if (message) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {message = ''}, 3000);
		}
</script>
{#if message}
	<div  transition:fade>
		{message}
	</div>
{/if}