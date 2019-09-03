<style>
    .container {
        height:100%;
        width:100%;
    }
    .ripple-container {
        position:relative;
        height:100%;
        width:100%;
        overflow: hidden;
    }
    @keyframes ripple {
        0% {
            opacity: 0.3;
            transform: scale(1);
        }
        50% {
            transform: scale(8);
        }
        100% {
            opacity: 0;
        }
    }
    .ripple {
        position: absolute;
        height: 50px;
        width: 50px;
        background: white;
        border-radius: 50%;
        opacity: 0.3;
        animation-name: ripple;
        animation-duration: 500ms;
        animation-iteration-count: 1;
        animation-timing-function: ease;
    }
</style>
<script>
    let ripple = false;
    let style='';
    let node;
    function end() {
        ripple = false;
        node.removeEventListener('animationend', end)
    }
    function start(e) {
        console.log($$props)
        node = e.currentTarget;
        style=`left: ${e.offsetX - 25}px; top: ${e.offsetY - 25}px;`
        ripple = true;
        node.addEventListener('animationend', end);
    }
</script>
<div class=container on:click>
    <div class=ripple-container on:click={start}>
        <div class:ripple {style}/>
        <slot/>
    </div>
</div>
