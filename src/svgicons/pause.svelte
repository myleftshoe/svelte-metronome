<script>
    import SvgIcon from './svgicon.svelte';
</script>
<SvgIcon size={$$props.size} color={$$props.color} on:click>
    <rect x=5 width="3" height="24" rx="2" />
    <rect x=16 width="3" height="24" rx="2" />
</SvgIcon>
