<style>
    div { 
        font-size: 6vh;
        color: #fff;
        text-align: center;
        -webkit-animation: glow 1s ease-in-out infinite alternate;
        -moz-animation: glow 1s ease-in-out infinite alternate;
        animation: glow 1s ease-in-out infinite alternate;
        text-shadow: 
            0 0 1vh #fff, 
            0 0 2vh #fff, 
            0 0 3vh #088, 
            0 0 4vh #088, 
            0 0 5vh #088;        
    }
    @-webkit-keyframes glow {
        to { text-shadow: 
            0 0 2vh #fff, 
            0 0 3vh #0ff, 
            0 0 4vh #0ff, 
            0 0 5vh #0ff, 
            0 0 6vh #0ff, 
            0 0 7vh #0ff, 
            0 0 8vh #0ff;
        }
    }
    @keyframes glow {
        to { text-shadow: 
            0 0 2vh #fff, 
            0 0 3vh #0ff, 
            0 0 4vh #0ff, 
            0 0 5vh #0ff, 
            0 0 6vh #0ff, 
            0 0 7vh #0ff, 
            0 0 8vh #0ff;
        }
    }
</style>
<script>
    import {fade} from 'svelte/transition'; 
</script>
<div in:fade={{delay:5000, duration:1000}}>
    Neonome
</div>
