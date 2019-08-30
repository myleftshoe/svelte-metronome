<style>
    .container {
        display:flex;
        flex-direction:row;
        width:100%;
        /* background-color: #f003; */
    }
    .center {
        position:relative;
        display:flex;
        flex-direction: column;
        align-items:center;
        justify-content: center;
        flex:1;
    }
    .overlay {
        position:absolute;
        /* background-color: #00f2; */
        z-index:1;
        pointer-events:none;
    }
    .hotspot {
        /* background-color: red; */
        width:32px;
        height:100%;
    }
</style>
<script>
    import CircularSlider from '.';
    import NumericInput from '.'; 
    export let value;
    function handleChange(e) {
        value = e.detail.value 
    }
</script>
<div class=container>
    <div class='hotspot' on:click={() => {value--}}></div>
    <div class=center>
        <overlay class=overlay>
            <NumericInput label=bpm bind:value min={20} max={360}/>
        </overlay>
        <CircularSlider bind:value/>
    </div>
    <div class='hotspot' on:click={() => {value++}}></div>
</div>