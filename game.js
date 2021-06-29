
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$("body").keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    let userChosenColor = $(this).attr("id");

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});


function nextSequence() {
    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);
    
    let randomNumber =  Math.floor(Math.random() * 4);

    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
}, 100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000); 
        }
    }
else{
        playSound("wrong")
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key To Restart");
        
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 500 );
        
        reset();
    }
}

function reset(){
    level = 0;
    gamePattern = [];
    started = false;
}
