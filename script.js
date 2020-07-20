$(function(){
    let audio = new Audio('pokemon-title-theme.mp3')
    $('body').mousemove(function(){
        audio.play();
    })
})