<style>
	div {
		position:fixed;
		height:50%;
		width:100%;
		display:flex;
		align-items:flex-end;
		justify-content: center;
		color:#ffff;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size:5vh;
		pointer-events: none;
		/* text-shadow: black 0 0 1vh; */
	}
</style>
<script>
	export let message = '';
	import {fade} from 'svelte/transition';
	let timeout;
	$: if (message) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {message = ''}, 1500);
		}
</script>
{#if message}
	<div transition:fade>
		{message}
	</div>
{/if}