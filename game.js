var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var start=0;

$(".btn").click(function(){
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){ 
    userClickedPattern=[];
    level=level+1;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(4*Math.random());
    var randomChoosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor);
    animatePress(randomChoosenColor);
}


function playSound(colour){
    var audio=new Audio("sounds/"+colour+".mp3");
    audio.play();
}

function animatePress(currentColour){
        $("#"+currentColour).addClass("pressed");
        setTimeout(function(){
            $("#"+currentColour).removeClass("pressed");
        },100);
}


$(document).keypress(function(){
    if(start===0){
    $("#level-title").text("Level "+level);
    nextSequence();
    start=1;
 }
});


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
  else{
      playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over,Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
  },200);

  start=0;
  level=0;
  gamePattern=[];
  }
}