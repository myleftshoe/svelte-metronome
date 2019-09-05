<script>
	const { left, right, props } = {...$$props};
	import Left from './side-button-left.svelte';
	import Right from './side-button-right.svelte';
</script>
{#if (right)}
	<Right {...props} on:click/>
{:else}
	<Left {...props} on:click/>
{/if}