<style>
    button {
        margin:2px;
        padding:0;
        border-radius: 2px;
        border: 1px solid #0ff5;
        flex:1;
        background: #0ff5;
        cursor:pointer;
        z-index:1;
                /* border-color: white; */
        background: #0ff5;
        box-shadow: 
        /* 0 0 10px #0004 inset,  */
        0 0 60px #0008 inset, 
        /* 0 0 120px #0008 inset, */
        0 0 5px #0ff2, 
        0 0 20px #0ff2, 
        0 0 40px #0ff2;
        transition: background-color 150ms ease;
    }
    .selected {
        /* background-color: var(--primary-color);
        border-color: var(--primary-color); */
        background: #ff05;
                border-color: white;
        background: #ff05;
        box-shadow: 
        /* 0 0 10px #0004 inset,  */
        0 0 60px #0008 inset, 
        /* 0 0 120px #0008 inset, */
        0 0 5px #ff05, 
        0 0 20px #ff05, 
        0 0 40px #ff05;
    }
    .active {
        /* background-color: white; */
        border-color: white;
        background: #0ff;
        box-shadow: 
        /* 0 0 10px #0004 inset,  */
        0 0 60px #0008 inset, 
        /* 0 0 120px #0008 inset, */
        0 0 5px #0ff, 
        0 0 20px #0ff, 
        0 0 40px #0ff;
    }
        .activeselected {
        /* background-color: white; */
        border-color: white;
        background: #f00;
        box-shadow: 
        /* 0 0 10px #0004 inset,  */
        0 0 60px #0008 inset, 
        /* 0 0 120px #0008 inset, */
        0 0 5px #f00, 
        0 0 20px #f00, 
        0 0 40px #f00;
    }
</style>

<script>
    export let id;
    export let selected = false;
    export let active = false;
    // $:active = id === 2
</script>

<button {id} class:selected={selected} class:active={active} class:activeselected={selected && active} on:click/>
