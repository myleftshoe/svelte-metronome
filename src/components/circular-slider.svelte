<style>
</style>

<script>
	import {onMount, onDestroy} from 'svelte';
    // import Slider from "@maslick/radiaslider";
    import Slider from "./circular-slider";
    export let value=40;
    export let min=0;
    export let max=360;
    export let step=10;
    
    let slider;

    onMount(() => {
        slider = new Slider({ canvasId: "canvas", continuousMode: false,});
        slider.addSlider({
            id: 1,
            radius: 100,
            value,
            min,
            max,
            step,
            color: getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'),
            changed: function(v) {value = v.value }
        });
        // slider.setSliderValue(1, value);

        // window.addEventListener('load', resize, false);
        // window.addEventListener('resize', resize, false);

    });

    // onDestroy(() => {
    //     window.removeEventListener('load', resize, false);
    //     window.removeEventListener('resize', resize, false);
    // })


    function resize() {
        // Our canvas must cover full height of screen
        // regardless of the resolution
        var height = window.innerHeight;
        
        // So we need to calculate the proper scaled width
        // that should work well with every resolution
        var ratio = canvas.width/canvas.height;
        var width = height * ratio;
        console.log(canvas.style.width, canvas.style.height)
        // canvas.style.width = width+'px';
        // canvas.style.height = height+'px';
    }

    $: { slider && slider.setSliderValue(1, value); }

</script>

<canvas id="canvas" value={value} width="300" height="300" tabindex="0"/>
