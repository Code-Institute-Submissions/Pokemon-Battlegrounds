$(function(){
    // Ensuring the use of Pokemon Font for the instructions
    let paragraph = document.querySelector('.text-dialogue');
    paragraph.style.fontFamily= 'Pokemon GB';
    
    // Usage of the TypewriterJs to create the typewriting effect of the instructions
    const typewriter = new Typewriter('.text-dialogue', {
        autoStart: true
      });
    
    let instruction_text  = [
        '<h4>Hi! Sorry to keep you waiting!</h4>',
        '<h4>Welcome to Pokemon Battlegrounds!</h4>',
        '<h4>My name is OAK.</h4>',
        '<h4>But everyone calls me Professor OAK.</h4>',
        '<h4>Alright, enough chatter, let me explain the rules of the game to you.</h4>',
        '<h4>In Pokemon Battlegrounds, there will be a map displayed with your location shown as well as a timer of 30 minutes.</h4>',
        '<h4>Within your vicinity, there will be pokemon spawned at various locations and will be indicated on the map as markers.</h4>',
        '<h4>Your role is to head to those locations and try to catch the pokemon before the timer runs out.</h4>',
        '<h4>In addition, each pokemon you catch will be displayed in the My Pokemon area and your current statistics can be found in the My Stats area.</h4>',
        '<h4>The game will end when the time runs out and if you wish to restart an option will be given to do so.</h4>',
        '<h4>Now that you are aware of the game rules are you ready to play?</h4>'
    ]  
    
    typewriter.changeDelay(40)
    typewriter.callFunction(()=>{
        $(".Typewriter__cursor").hide();
    })
    
    typewriter.pauseFor(3000)
    .typeString(instruction_text[0])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[1])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[2])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[3])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[4])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[5])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[6])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[7])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[8])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[9])
    .pauseFor(2500)
    .deleteAll(15)
    .typeString(instruction_text[10])
    .pauseFor(2500)
    .deleteAll(15)
    .start();
    // Displays the commencement of the start game once all the instructions have been displayed
    setTimeout(function(){
        $('#initialize-game').css('visibility','visible')
        $('#initialize-game').click(function(){
          let start_confirmation= confirm('Are you ready to begin?');
          if (start_confirmation == true){
              window.location.href = "gameApplication.html"
          }else{
              alert('Alright, I understand, please come back when you are ready!')
          }
        })
    
    },85000)
   //Function to allow players to skip the instructions and dive straight into the game
    $('#skip-instructions').click(function(){
        let skip_confirmation= confirm('Are you sure you wish to skip the instructions?');
        if(skip_confirmation ==true){
            window.location.href= "gameApplication.html"
        }else{
            alert('I understand, it was an accident, I will now repeat the instructions for you.')
            setInterval(function(){
                window.location.href="instructions.html"
            },2000)
        }
    })
    // Implementing the audio into the page
    let birchAudio = new Audio('birch-bgm.mp3');
    birchAudio.style.display= "none";
    $('body').mousemove(function(){
        birchAudio.play();
    })
    $('body').on('tap',function(){
        birchAudio.play();
    })
})