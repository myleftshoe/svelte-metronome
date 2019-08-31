<style>
    button {
        background: url('button.png');
        /* background-color:  transparent; */
        /* border: 2px solid var(--primary-color); */
        border:none;
        border-radius: 12px;
        outline:none;
        /* padding: .5em 1em; */
        /* color: var(--primary-color); */
        font-size:1em;
        cursor: pointer;
        height:64px;
        width:64px;
        box-shadow: 
            0px 0px 2px 4px black,   
            0px 0px 5px 5px #555a; 

    }
</style>
<script>
    export let playing=false;
</script>

<button on:click={() => playing = !playing}>
    <!-- <slot/> -->
</button>