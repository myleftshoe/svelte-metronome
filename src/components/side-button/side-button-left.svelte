<style>
	div { 
        position:relative;
		background-color: var(--color);
		height: var(--height);
		width:14px;
		border-radius: 0% 9px 9px 0%;
		box-shadow: 
            +2px 0px 2px 0px #fff1 ,
            +2px 0px 2px 0px #222 inset,
            -3px 0px 3px 0px #000 inset
	}
	.pressed {
		box-shadow: 
            +2px 0px 2px 0px #fff1 ,
			-2px 0px 2px 0px #222 inset,
			+3px 0px 3px 0px #000 inset
	}
        /* increase hit test area */
    div:after {
        content:'';
        position:absolute;
        top:-10px; bottom:-10px; 
        left:-5vh; right:-5vh; 
    }
</style>
<script>
    export let color = '#aaa';
	export let height = '15vh;'
	let pressed = false;
	const style=`--color: ${color}5; --height: ${height};`
</script>
<div {style} 
	class:pressed 
	on:pointerdown={() => pressed = true} 
	on:pointerup={() => pressed = false}
	on:click
/>
