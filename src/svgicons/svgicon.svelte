<script>
    export let name = 'clear'
    export let size = 24;
    export let color = 'white';
</script>

<svg xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size}
    viewBox={`0 0 24 24`}
    style={`fill:${color}; cursor: pointer; padding: calc( ${size} * 1.0 )`}
    on:click
    class=svg
>
    <slot/>
</svg>

