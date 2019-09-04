<style>
    div {
        background:url('scratched-metal.png');
        margin:1px;
        border-radius: .7vh;
    }
    button {
        flex:1;
        width:100%;
        height:100%;
        margin:0;
        padding:0;
        outline:none;
        cursor:pointer;
        border-radius: .7vh;
        /* transition: background-color 150ms ease; */
        border-width: 1px;
        border-style: solid;
        border-color: #fff7;
        background-color: #0ff5;
        box-shadow: 
            0 0 60px #0008 inset, 
            0 0 5px #0ff2, 
            0 0 20px #0ff2, 
            0 0 40px #0ff2;
    }
    .selected {
        border-color: #fff7;
        background-color: #ff05;
        box-shadow: 
            0 0 60px #0008 inset, 
            0 0 5px #ff05, 
            0 0 20px #ff05, 
            0 0 40px #ff05;
    }
    .active {
        border-color: white;
        background-color: #0ff;
        box-shadow: 
            0 0 60px #0008 inset, 
            0 0 5px #0ff, 
            0 0 20px #0ff, 
            0 0 40px #0ff;
    }
    .activeselected {
        border-color: white;
        background-color: #f00;
        box-shadow: 
            0 0 60px #0008 inset, 
            0 0 5px #f00, 
            0 0 20px #f00, 
            0 0 40px #f00;
    }
</style>

<script>
    export let selected = false;
    export let active = false;
</script>
<div>
    <button 
        class:selected class:active class:activeselected={selected && active} 
        on:pointerdown={() => active = true} 
        on:pointerup={() => active = false}  
        on:click
        on:contextmenu|preventDefault
    />
</div>