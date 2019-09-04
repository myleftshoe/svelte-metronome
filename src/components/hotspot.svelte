<style>
    .container {
        height:100%;
        width:100%;
        cursor: pointer;
    }
    .ripple-container {
        position:relative;
        height:100%;
        width:100%;
        overflow: hidden;
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size:12px;
    }
    @keyframes ripple {
        0% {
            opacity: 0.15;
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
        background: cyan;
        border-radius: 50%;
        opacity: 0.15;
        animation-name: ripple;
        animation-duration: 300ms;
        animation-iteration-count: 1;
        animation-timing-function: ease;
    }
	.show {
        background-color: #0001;
		outline: 1px solid #0005;
	} 
</style>
<script>
    export let show = false;
    let ripple = false;
    let style = '';
    let node;
    function end() {
        ripple = false;
        node.removeEventListener('animationend', end)
    }
    function start(e) {
        node = e.currentTarget;
        style=`left: ${e.offsetX - 25}px; top: ${e.offsetY - 25}px;`
        ripple = true;
        node.addEventListener('animationend', end);
    }
</script>
<div class=container class:show on:click>
    <div class=ripple-container on:click={start}>
        <div class:ripple {style}/>
        {#if show}
            <slot/>
        {/if}
    </div>
</div>
