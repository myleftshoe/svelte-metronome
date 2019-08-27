<script>
	import {onMount, onDestroy} from 'svelte';
    // import Slider from "@maslick/radiaslider";
    // import LinearSlider from "@maslick/radiaslider/src/slider-linear";

    import Slider from "./circular-slider";
    export let value=40;
    export let min=0;
    export let max=360;
    export let step=10;
    
    let slider;

    function createSlider(node) {

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
    }

    $: { slider && slider.setSliderValue(1, value); }

</script>

<canvas id="canvas" value={value} 
    use:createSlider
    width="300" height="300" 
/>
