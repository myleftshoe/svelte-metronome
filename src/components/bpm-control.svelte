<style>
    .container {
        /* pointer-events:auto; */
        position:relative;
        display:flex;
        flex-direction:row;
        /* background-color: #f003; */
    }
    .button {
        bottom:0px;
        flex:1;
        align-self: flex-end;
    }
    .underlay {
        pointer-events:none;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
        position:absolute;
        height:100%;
        width:100%;
        /* background-color: #f003; */
        z-index:1;
    }
</style>
<script>
    import CircularSlider from './circular-slider.svelte';
    import NumericInput from './input-numeric.svelte'; 
    // import Crementor from './crementor.svelte'
    export let value;
    function handleChange(e) {
        value = e.detail.value 
    }
</script>
<div class='container'>
    <!-- <Crementor on:change={handleChange} {value} step={-1}/> -->
    <!-- <button class=button>-</button> -->
    <!-- <button class=button>+</button> -->
        <!-- <Crementor on:change={handleChange} {value} step={+1}/> -->
    <underlay class=underlay>
        <NumericInput label=bpm bind:value min={20} max={360}/>
        <!-- <label style='font-size:3em'>{value}</label>
        <label>bpm</label> -->
    </underlay>
    <CircularSlider bind:value/>

</div>