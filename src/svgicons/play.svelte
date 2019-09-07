<script>
    import SvgIcon from './svgicon.svelte';
</script>
<SvgIcon size={$$props.size} color={$$props.color} on:click>
    <polygon points = "0,0 24,12, 0,24"/>
</SvgIcon>
