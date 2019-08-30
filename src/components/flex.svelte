<style>
    div {
        display:flex;
        /* flex-direction:row;
        justify-content:center;
        align-items:center; */
    }
</style>
<script>
    export let column = false;
    let style = column ? 'flex-direction:column; ' : '';
    style += $$props.style;
</script>
<div {style}>
    <slot/>
</div>  