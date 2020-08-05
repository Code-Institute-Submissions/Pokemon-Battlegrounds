$(function(){
    // Play background music upon mouse action or any touch movement
    let audio = new Audio('pokemon-title-theme.mp3')
    $('body').mousemove(function(){
        audio.play();
    })
    $('body').on("tap",function(){
        audio.play();
    })
})