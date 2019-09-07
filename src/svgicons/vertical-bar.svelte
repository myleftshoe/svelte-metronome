<script>
    import SvgIcon from './svgicon.svelte';
</script>
<SvgIcon size={$$props.size} color={$$props.color} on:click>
    <rect x=10 width="3" height="24" rx="2" />
</SvgIcon>
